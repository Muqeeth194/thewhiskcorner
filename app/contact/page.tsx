import ContactForm from "@/components/pages/contact-form"

export const metadata = {
  title: "Contact",
}

export default function Contact() {
  return (
    <main className="container flex flex-col items-center py-8">
      <ContactForm />
    </main>
  )
}
