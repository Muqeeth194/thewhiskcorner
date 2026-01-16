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

interface StatusFilterProps {
  isStatusOpen: boolean
  setIsStatusOpen: (open: boolean) => void
  selectedStatus: string[]
  setSelectedStatus: (status: string[]) => void
}

const statuses = [
  { id: "active", label: "Active", value: "Active" },
  { id: "inactive", label: "Inactive", value: "Inactive" },
  { id: "draft", label: "Draft", value: "Draft" },
]

export default function StatusFilter({
  isStatusOpen,
  setIsStatusOpen,
  selectedStatus,
  setSelectedStatus,
}: StatusFilterProps) {
  const handleStatusChange = (checked: boolean, statusValue: string) => {
    if (checked) {
      setSelectedStatus([...selectedStatus, statusValue])
    } else {
      setSelectedStatus(
        selectedStatus.filter((status) => status !== statusValue)
      )
    }
  }

  return (
    <div className="w-full">
      <Collapsible
        open={isStatusOpen}
        onOpenChange={setIsStatusOpen}
        className="flex w-full flex-col gap-2"
      >
        <CollapsibleTrigger asChild>
          <div className="flex cursor-pointer items-center justify-between px-2">
            <h4 className="text-sm font-semibold text-slate-600 hover:text-pink-600">
              Status
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
          {statuses.map((status, index) => (
            <React.Fragment key={status.id}>
              <Label
                htmlFor={status.id}
                className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-all hover:bg-pink-50"
              >
                <Checkbox
                  id={status.id}
                  className="border-2 border-slate-300 data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-600"
                  checked={selectedStatus.includes(status.value)}
                  onCheckedChange={(checked) =>
                    handleStatusChange(!!checked, status.value)
                  }
                />
                <span className="text-sm text-slate-600 group-hover:text-pink-700">
                  {status.label}
                </span>
              </Label>
              {index < statuses.length - 1 && (
                <hr className="w-full border-pink-200" />
              )}
            </React.Fragment>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
