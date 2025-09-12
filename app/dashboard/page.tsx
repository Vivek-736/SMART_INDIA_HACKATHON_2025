'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const useReverseGeocode = () => {
  const [location, setLocation] = useState({ state: "", detailedRegion: "" })
  const [error, setError] = useState(null)

  const getLocation = async () => {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const lat = pos.coords.latitude
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const lon = pos.coords.longitude
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&zoom=10`
      )
      if (!res.ok) throw new Error("Failed to fetch location data")
      const data = await res.json()
      const state = data.address.state || data.address.province || data.address.region || "Unknown"
      const detailedRegion = `${data.address.city || ""}, ${data.address.county || ""}, ${
        data.address.state_district || ""
      }, ${data.address.state || ""}, ${data.address.country || ""}`
        .replace(/, ,/g, ",")
        .replace(/,$/, "")
      setLocation({ state, detailedRegion })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message)
    }
  }

  return { location, error, getLocation }
}

const DashboardPage = () => {
  const initialFormData = {
    crop: "",
    season: "",
    state: "",
    annualRainfall: "",
    area: "",
    fertilizer: "",
    pesticide: "",
    cropYear: "",
  }

  const [formData, setFormData] = useState(initialFormData)
  const [isLoading, setIsLoading] = useState(false)

  const { location, getLocation } = useReverseGeocode()
  const router = useRouter()

  useEffect(() => {
    if (location.detailedRegion) {
      setFormData((prev) => ({ ...prev, state: location.detailedRegion }))
    }
  }, [location.detailedRegion])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: any) => (e: any) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/create-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const { chatId } = await response.json()
      setFormData(initialFormData)

      router.push(`/dashboard/chat/${chatId}`)
    } catch (error) {
      console.error("Error creating chat:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto flex justify-center">
      <div className="w-full">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-black mb-2 tracking-tight">Crop Analysis</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Enter your crop details for intelligent yield prediction
          </p>
        </div>

        <Card className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden mx-auto max-w-2xl">
          <CardContent className="p-5">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="crop" className="text-xs font-semibold text-black tracking-wide">
                    Crop Type
                  </Label>
                  <Input
                    id="crop"
                    value={formData.crop}
                    onChange={handleChange("crop")}
                    className="h-9 border-2 border-gray-200 rounded-lg bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="e.g., Rice, Wheat, Cotton"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="season" className="text-xs font-semibold text-black tracking-wide">
                    Season
                  </Label>
                  <Input
                    id="season"
                    value={formData.season}
                    onChange={handleChange("season")}
                    className="h-9 border-2 border-gray-200 rounded-lg bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="e.g., Kharif, Rabi"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="state" className="text-xs font-semibold text-black tracking-wide">
                  State/Region
                </Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={handleChange("state")}
                    className="flex-1 h-9 border-2 border-gray-200 rounded-lg bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="Enter your state/region"
                  />
                  <Button
                    type="button"
                    onClick={getLocation}
                    className="h-9 px-3 bg-white border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Auto-detect
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="annualRainfall" className="text-xs font-semibold text-black tracking-wide">
                    Annual Rainfall (mm)
                  </Label>
                  <Input
                    id="annualRainfall"
                    type="number"
                    value={formData.annualRainfall}
                    onChange={handleChange("annualRainfall")}
                    className="h-9 border-2 border-gray-200 rounded-lg bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="e.g., 1200"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="area" className="text-xs font-semibold text-black tracking-wide">
                    Area (hectares)
                  </Label>
                  <Input
                    id="area"
                    type="number"
                    value={formData.area}
                    onChange={handleChange("area")}
                    className="h-9 border-2 border-gray-200 rounded-lg bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="e.g., 5.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="fertilizer" className="text-xs font-semibold text-black tracking-wide">
                    Fertilizer (kg/hectare)
                  </Label>
                  <Input
                    id="fertilizer"
                    type="number"
                    value={formData.fertilizer}
                    onChange={handleChange("fertilizer")}
                    className="h-9 border-2 border-gray-200 rounded-lg bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="e.g., 120"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="pesticide" className="text-xs font-semibold text-black tracking-wide">
                    Pesticide (kg/hectare)
                  </Label>
                  <Input
                    id="pesticide"
                    type="number"
                    value={formData.pesticide}
                    onChange={handleChange("pesticide")}
                    className="h-9 border-2 border-gray-200 rounded-lg bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="e.g., 2.5"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="cropYear" className="text-xs font-semibold text-black tracking-wide">
                  Crop Year
                </Label>
                <Input
                  id="cropYear"
                  type="number"
                  value={formData.cropYear}
                  onChange={handleChange("cropYear")}
                  className="h-9 border-2 border-gray-200 rounded-lg bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                  placeholder="e.g., 2024"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-9 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-base tracking-wide hover:ring-2 hover:ring-green-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Analyze Crop Data
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
