"use client"

import { useState, useEffect } from "react"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

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
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&zoom=10`,
      )
      if (!res.ok) throw new Error("Failed to fetch location data")
      const data = await res.json()
      const state = data.address.state || data.address.province || data.address.region || "Unknown"
      const detailedRegion =
        `${data.address.city || ""}, ${data.address.county || ""}, ${data.address.state_district || ""}, ${data.address.state || ""}, ${data.address.country || ""}`
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
  const [formData, setFormData] = useState({
    crop: "",
    season: "",
    state: "",
    annualRainfall: "",
    area: "",
    fertilizer: "",
    pesticide: "",
    cropYear: "",
  })

  const { location, getLocation } = useReverseGeocode()

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
    try {
      const response = await fetch("/api/predict-yield", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Crop yield prediction response:", data)

    } catch (error) {
      console.error("Error calling crop yield API:", error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto py-6 md:px-0 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-sm">
              <Image
                src="/favicon.png"
                alt="AgroGen Logo"
                width={24}
                height={24}
                className="object-contain filter invert"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-black tracking-tight">AgroGen</h1>
          </div>
          <UserButton />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pb-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-3 tracking-tight">Crop Analysis</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Enter your crop details for intelligent yield prediction
          </p>
        </div>

        <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="crop" className="text-sm font-semibold text-black tracking-wide">
                    Crop Type
                  </Label>
                  <Input
                    id="crop"
                    value={formData.crop}
                    onChange={handleChange("crop")}
                    className="h-12 border-2 border-gray-200 rounded-xl bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="e.g., Rice, Wheat, Cotton"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="season" className="text-sm font-semibold text-black tracking-wide">
                    Season
                  </Label>
                  <Input
                    id="season"
                    value={formData.season}
                    onChange={handleChange("season")}
                    className="h-12 border-2 border-gray-200 rounded-xl bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="e.g., Kharif, Rabi"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="state" className="text-sm font-semibold text-black tracking-wide">
                  State/Region
                </Label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={handleChange("state")}
                    className="flex-1 h-12 border-2 border-gray-200 rounded-xl bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="Enter your state/region"
                  />
                  <Button
                    type="button"
                    onClick={getLocation}
                    className="h-12 px-6 bg-white border-2 border-black text-black rounded-xl hover:bg-black hover:text-white transition-all duration-300 font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="annualRainfall" className="text-sm font-semibold text-black tracking-wide">
                    Annual Rainfall (mm)
                  </Label>
                  <Input
                    id="annualRainfall"
                    type="number"
                    value={formData.annualRainfall}
                    onChange={handleChange("annualRainfall")}
                    className="h-12 border-2 border-gray-200 rounded-xl bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="e.g., 1200"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="area" className="text-sm font-semibold text-black tracking-wide">
                    Area (hectares)
                  </Label>
                  <Input
                    id="area"
                    type="number"
                    value={formData.area}
                    onChange={handleChange("area")}
                    className="h-12 border-2 border-gray-200 rounded-xl bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="e.g., 5.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="fertilizer" className="text-sm font-semibold text-black tracking-wide">
                    Fertilizer (kg/hectare)
                  </Label>
                  <Input
                    id="fertilizer"
                    type="number"
                    value={formData.fertilizer}
                    onChange={handleChange("fertilizer")}
                    className="h-12 border-2 border-gray-200 rounded-xl bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="e.g., 120"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="pesticide" className="text-sm font-semibold text-black tracking-wide">
                    Pesticide (kg/hectare)
                  </Label>
                  <Input
                    id="pesticide"
                    type="number"
                    value={formData.pesticide}
                    onChange={handleChange("pesticide")}
                    className="h-12 border-2 border-gray-200 rounded-xl bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                    placeholder="e.g., 2.5"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="cropYear" className="text-sm font-semibold text-black tracking-wide">
                  Crop Year
                </Label>
                <Input
                  id="cropYear"
                  type="number"
                  value={formData.cropYear}
                  onChange={handleChange("cropYear")}
                  className="h-12 border-2 border-gray-200 rounded-xl bg-white text-black placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 hover:border-gray-300"
                  placeholder="e.g., 2024"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-14 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg tracking-wide hover:ring-4 hover:ring-green-200"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Analyze Crop Data
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default DashboardPage
