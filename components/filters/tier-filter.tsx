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

interface TierFilterProps {
  isTierOpen: boolean
  setIsTierOpen: (open: boolean) => void
  selectedTier: string[]
  setSelectedTier: (tier: string[]) => void
}

const tiers = [
  { id: "1", label: "1 Tier", value: "1" },
  { id: "2", label: "2 Tier", value: "2" },
  { id: "3", label: "3 Tier", value: "3" },
  { id: "4", label: "4 Tier", value: "4" },
]

export default function TierFilter({
  isTierOpen,
  setIsTierOpen,
  selectedTier,
  setSelectedTier,
}: TierFilterProps) {
  const handleTierChange = (checked: boolean, tierValue: string) => {
    if (checked) {
      setSelectedTier([...selectedTier, tierValue])
    } else {
      setSelectedTier(selectedTier.filter((status) => status !== tierValue))
    }
  }

  return (
    <div className="w-full">
      <Collapsible
        open={isTierOpen}
        onOpenChange={setIsTierOpen}
        className="flex w-full flex-col gap-2"
      >
        <CollapsibleTrigger asChild>
          <div className="flex cursor-pointer items-center justify-between px-2">
            <h4 className="text-sm font-semibold text-slate-600 hover:text-pink-600">
              Tiers
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
          {tiers.map((tier, index) => (
            <React.Fragment key={tier.id}>
              <Label
                htmlFor={tier.id}
                className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-all hover:bg-pink-50"
              >
                <Checkbox
                  id={tier.id}
                  className="border-2 border-slate-300 data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-600"
                  checked={selectedTier.includes(tier.value)}
                  onCheckedChange={(checked) =>
                    handleTierChange(!!checked, tier.value)
                  }
                />
                <span className="text-sm text-slate-600 group-hover:text-pink-700">
                  {tier.label}
                </span>
              </Label>
              {index < tiers.length - 1 && (
                <hr className="w-full border-pink-200" />
              )}
            </React.Fragment>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
