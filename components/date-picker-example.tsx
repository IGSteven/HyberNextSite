"use client"

import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Label } from "@/components/ui/label"

export function DatePickerComponent() {
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  return (
    <div className="space-y-2">
      <Label htmlFor="date-picker">Select Date</Label>
      <DatePicker
        id="date-picker"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        dateFormat="MMMM d, yyyy"
      />
    </div>
  )
}
