import React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"

interface CategoryFilterProps {
  isCategoryOpen: boolean
  setIsCategoryOpen: (open: boolean) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
}

const categories = [
  { id: "wedding-cakes", label: "Wedding Cakes", value: "Wedding Cakes" },
  {
    id: "anniversary-cakes",
    label: "Anniversary Cakes",
    value: "Anniversary Cakes",
  },
  {
    id: "celebration-cakes",
    label: "Celebration Cakes",
    value: "Celebration Cakes",
  },
  { id: "deserts", label: "Deserts", value: "Deserts" },
]

export default function CategoryFilter({
  isCategoryOpen,
  setIsCategoryOpen,
  selectedCategories,
  setSelectedCategories,
}: CategoryFilterProps) {
  const handleCategoryChange = (checked: boolean, categoryValue: string) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryValue])
    } else {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== categoryValue)
      )
    }
  }

  return (
    <div className=" w-full">
      <Collapsible
        open={isCategoryOpen}
        onOpenChange={setIsCategoryOpen}
        className="flex w-full flex-col gap-2"
      >
        <CollapsibleTrigger asChild>
          <div className="flex cursor-pointer items-center justify-between px-2">
            <h4 className="text-sm font-semibold text-slate-600 hover:text-pink-600">
              Category
            </h4>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-slate-400 hover:bg-pink-50 hover:text-pink-600"
            >
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-0 rounded-md border border-pink-200 pt-0">
          {categories.map((category, index) => (
            <React.Fragment key={category.id}>
              <Label
                htmlFor={category.id}
                className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-all hover:bg-pink-50"
              >
                <Checkbox
                  id={category.id}
                  className="border-2 border-slate-300 data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-600"
                  checked={selectedCategories.includes(category.value)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(!!checked, category.value)
                  }
                />
                <span className="text-sm text-slate-600 group-hover:text-pink-700">
                  {category.label}
                </span>
              </Label>
              {index < categories.length - 1 && (
                <hr className="w-full border-pink-200" />
              )}
            </React.Fragment>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
