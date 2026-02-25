// components/filters/FlavorFilter.tsx
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

interface FlavorFilterProps {
  isFlavorOpen: boolean
  setIsFlavorOpen: (open: boolean) => void
  selectedFlavors: string[]
  setSelectedFlavors: (flavor: string[]) => void
}

export const Flavores = [
  // Chocolate Based
  {
    id: "classic-truffle",
    label: "Classic Truffle",
    value: "Classic Truffle",
  },
  {
    id: "rich-chocolate-raspberry",
    label: "Rich Chocolate and Raspberry",
    value: "Rich Chocolate and Raspberry",
  },
  {
    id: "dulce-de-leche",
    label: "Dulce de Leche",
    value: "Dulce de Leche",
  },
  {
    id: "chocolate-caramel",
    label: "Chocolate and Caramel",
    value: "Chocolate and Caramel",
  },
  {
    id: "chocolate-hazelnuts-praline",
    label: "Chocolate & Hazelnuts Praline",
    value: "Chocolate & Hazelnuts Praline",
  },
  {
    id: "hazelnut-praline-french-biscuits",
    label: "Hazelnut Praline with French Biscuits",
    value: "Hazelnut Praline with French Biscuits",
  },
  {
    id: "mocha",
    label: "Mocha",
    value: "Mocha",
  },
  {
    id: "chocolate-biscoff",
    label: "Chocolate Biscoff",
    value: "Chocolate Biscoff",
  },
  {
    id: "nutella-hazelnut",
    label: "Nutella Hazelnut",
    value: "Nutella Hazelnut",
  },
  {
    id: "nutella-strawberry-seasonal",
    label: "Nutella Strawberry",
    value: "Nutella Strawberry",
  },
  {
    id: "hazelnut-praline-french-biscuit-caramel",
    label: "Hazelnut Praline French Biscuit and Caramel",
    value: "Hazelnut Praline French Biscuit and Caramel",
  },

  // Vanilla Based
  {
    id: "strawberry-cream-seasonal",
    label: "Strawberry and Cream",
    value: "Strawberry and Cream",
  },
  {
    id: "lemon-raspberry",
    label: "Lemon and Raspberry",
    value: "Lemon and Raspberry",
  },
  {
    id: "vanilla-caramel",
    label: "Vanilla and Caramel",
    value: "Vanilla and Caramel",
  },
  {
    id: "caramel-roasted-almonds",
    label: "Caramel & Roasted Almonds",
    value: "Caramel & Roasted Almonds",
  },
  {
    id: "biscoff",
    label: "Biscoff",
    value: "Biscoff",
  },
  {
    id: "almond-praline",
    label: "Almond Praline",
    value: "Almond Praline",
  },
  {
    id: "vanilla-milk-chocolate",
    label: "Vanilla and Milk Chocolate",
    value: "Vanilla and Milk Chocolate",
  },
]

export default function FlavorFilter({
  isFlavorOpen,
  setIsFlavorOpen,
  selectedFlavors,
  setSelectedFlavors,
}: FlavorFilterProps) {
  const handleFlavorChange = (checked: boolean, FlavorValue: string) => {
    if (checked) {
      setSelectedFlavors([...selectedFlavors, FlavorValue])
    } else {
      setSelectedFlavors(
        selectedFlavors.filter((flavor) => flavor !== FlavorValue)
      )
    }
  }

  return (
    <div className="w-full">
      <Collapsible
        open={isFlavorOpen}
        onOpenChange={setIsFlavorOpen}
        className="flex w-full flex-col gap-2"
      >
        <CollapsibleTrigger asChild>
          <div className="flex cursor-pointer items-center justify-between px-2">
            <h4 className="text-sm font-semibold text-slate-600 hover:text-pink-600">
              Flavor
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
          {Flavores.map((Flavor, index) => (
            <React.Fragment key={Flavor.id}>
              <Label
                htmlFor={Flavor.id}
                className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-all hover:bg-pink-50"
              >
                <Checkbox
                  id={Flavor.id}
                  className="border-2 border-slate-300 data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-600"
                  checked={selectedFlavors.includes(Flavor.value)}
                  onCheckedChange={(checked) =>
                    handleFlavorChange(!!checked, Flavor.value)
                  }
                />
                <span className="text-sm text-slate-600 group-hover:text-pink-700">
                  {Flavor.label}
                </span>
              </Label>
              {index < Flavores.length - 1 && (
                <hr className="w-full border-pink-200" />
              )}
            </React.Fragment>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
