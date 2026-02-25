import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import FormData from "form-data"
import fetch from "node-fetch"
import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import { cakes } from "../db/schema/cakes" // Adjust path as needed
import dotenv from "dotenv"

// ES modules don't have __dirname, so we need to recreate it
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

// CONFIGURATION
const IMAGES_DIR = path.join(__dirname, "thewhiskcorner-images")
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = "cake_uploads"

// Database setup
const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})
const db = drizzle(client, { casing: "snake_case" })

// Helper: Pause execution
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Upload image to Cloudinary
async function uploadImageToCloudinary(imagePath) {
  const formData = new FormData()
  formData.append("file", fs.createReadStream(imagePath))
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
  formData.append("folder", "cakes")

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Failed to upload image")
    }

    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw error
  }
}

// Parse text file to extract cake details
function parseCakeDetails(txtContent) {
  const lines = txtContent.split("\n").map((line) => line.trim())
  const data = {}

  lines.forEach((line) => {
    if (line.includes(":")) {
      const [key, ...valueParts] = line.split(":")
      const value = valueParts.join(":").trim()
      data[key.trim()] = value
    }
  })

  return {
    name: data["Name"] || "Untitled Cake",
    description: data["Description"] || "A delicious cake",
    category: data["Category"] || "Custom Cake",
    servings: parseInt(data["Servings"]) || 12,
    baseFlavor: data["Base Flavor"] || "Classic truffle",
    leadTime: data["Lead Time"] || "3 days",
    tier: parseInt(data["Tier"]) || 1,
  }
}

async function seedDatabase() {
  try {
    console.log("🚀 Starting database seeding process...")
    console.log("------------------------------------------------")

    // 1. Get all JPG files
    const allFiles = fs.readdirSync(IMAGES_DIR)
    const images = allFiles.filter((file) =>
      file.toLowerCase().endsWith(".jpg")
    )

    console.log(`📸 Found ${images.length} images to process`)

    let successCount = 0
    let errorCount = 0

    // 2. Process each image
    for (const [index, imageFile] of images.entries()) {
      const txtFile = imageFile.replace(".jpg", ".txt")
      const txtPath = path.join(IMAGES_DIR, txtFile)
      const imagePath = path.join(IMAGES_DIR, imageFile)

      console.log(
        `\n[${index + 1}/${images.length}] Processing ${imageFile}...`
      )

      try {
        // Check if text file exists
        if (!fs.existsSync(txtPath)) {
          console.log(`⚠️  No .txt file found for ${imageFile}, skipping...`)
          errorCount++
          continue
        }

        // Read and parse cake details
        const txtContent = fs.readFileSync(txtPath, "utf-8")
        const cakeDetails = parseCakeDetails(txtContent)

        console.log(`  📝 Parsed: ${cakeDetails.name}`)

        // Upload to Cloudinary
        console.log(`  ☁️  Uploading to Cloudinary...`)
        const cloudinaryUrl = await uploadImageToCloudinary(imagePath)
        console.log(`  ✅ Uploaded: ${cloudinaryUrl}`)

        // Prepare details object for database
        const details = {
          servings: cakeDetails.servings,
          baseFlavor: cakeDetails.baseFlavor,
          leadTime: cakeDetails.leadTime,
          tier: cakeDetails.tier,
        }

        // Insert into database
        console.log(`  💾 Inserting into database...`)
        await db.insert(cakes).values({
          name: cakeDetails.name,
          image: cloudinaryUrl,
          category: cakeDetails.category,
          description: cakeDetails.description,
          details: JSON.stringify(details),
          status: "Active",
        })

        console.log(`  ✅ Successfully seeded: ${cakeDetails.name}`)
        successCount++

        // Rate limit protection
        await wait(2000)
      } catch (error) {
        console.error(`  ❌ Error processing ${imageFile}:`, error.message)
        errorCount++
      }
    }

    console.log("\n================================================")
    console.log("🎉 Seeding Complete!")
    console.log(`✅ Success: ${successCount} cakes`)
    console.log(`❌ Errors: ${errorCount} cakes`)
    console.log("================================================")
  } catch (error) {
    console.error("Fatal Error:", error)
  } finally {
    // Close database connection
    client.close()
  }
}

// Run the seeding
seedDatabase()
