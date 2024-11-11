"use client"

import { useState } from "react"
import {HelpCircle, Download, Save, Upload, Info } from "lucide-react"
import { Line, Bar, BarChart, LineChart } from "recharts"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

// Mock data for demonstration purposes
const mockData = {
  volumeCalculation: {
    seaLevel: 1000,
    targetAltitude: 1200,
  },
  excessLift: {
    seaLevel: 500,
    targetAltitude: 300,
  },
  atmosphericProperties: [
    { altitude: 0, density: 1.225, temperature: 15, pressure: 101.325 },
    { altitude: 5, density: 0.7364, temperature: 5.5, pressure: 54.048 },
    { altitude: 10, density: 0.4135, temperature: -4.5, pressure: 26.5 },
    { altitude: 15, density: 0.1948, temperature: -14.5, pressure: 12.044 },
    { altitude: 20, density: 0.0889, temperature: -24.5, pressure: 5.529 },
  ],
  liftCapacity: [
    { altitude: 0, lift: 1000 },
    { altitude: 5, lift: 900 },
    { altitude: 10, lift: 800 },
    { altitude: 15, lift: 700 },
    { altitude: 20, lift: 600 },
  ],
  volumeExpansion: [
    { altitude: 0, volume: 1000, liftReserve: 500 },
    { altitude: 5, volume: 1100, liftReserve: 450 },
    { altitude: 10, volume: 1200, liftReserve: 400 },
    { altitude: 15, volume: 1300, liftReserve: 350 },
    { altitude: 20, volume: 1400, liftReserve: 300 },
  ],
  historicalData: [
    { date: "2023-01-01", liftToWeightRatio: 1.2 },
    { date: "2023-02-01", liftToWeightRatio: 1.3 },
    { date: "2023-03-01", liftToWeightRatio: 1.1 },
    { date: "2023-04-01", liftToWeightRatio: 1.4 },
    { date: "2023-05-01", liftToWeightRatio: 1.2 },
  ],
}

export default function AirshipLiftAnalysisComponent() {
  const [showCalculator, setShowCalculator] = useState(false)
  const [weight, setWeight] = useState("")
  const [altitude, setAltitude] = useState("")
  const [tempMin, setTempMin] = useState("")
  const [tempMax, setTempMax] = useState("")
  const [showCalculationDetails, setShowCalculationDetails] = useState(false)
  const [calculationPerformed, setCalculationPerformed] = useState(false)


  const handleStartCalculation = () => {
    setShowCalculator(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call your calculation function
    console.log("Calculation submitted with:", { weight, altitude, tempMin, tempMax })
    setCalculationPerformed(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
     <header className="sticky top-0 z-10 w-full bg-background border-b shadow-sm backdrop-blur-md">
  <div className="container mx-auto flex h-16 items-center justify-between px-4">
    {/* Logo and Brand Name */}
    <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-foreground">
      <span>Airship Lift Analysis</span>
    </Link>

    {/* Navigation Links */}
    <nav className="hidden md:flex space-x-8 text-sm font-medium">
      <Link href="/" className="text-foreground/60 hover:text-foreground transition-colors">
        Home
      </Link>
      <Link href="/about" className="text-foreground/60 hover:text-foreground transition-colors">
        About
      </Link>
      <Link href="/docs" className="text-foreground/60 hover:text-foreground transition-colors">
        Documentation
      </Link>
    </nav>

    {/* Mobile Menu */}
    <div className="flex md:hidden">
      <Button variant="ghost" aria-label="Open Menu">
        {/* Menu Icon (Use an appropriate icon component here) */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Button>
    </div>
  </div>
</header>

      <main className="container mx-auto p-4">
        {!showCalculator ? (
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle>Welcome to Airship Lift & Atmospheric Analysis</CardTitle>
              <CardDescription>
                Calculate airship lift requirements and analyze atmospheric data with our interactive tool.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our application allows you to calculate airship lift requirements, visualize atmospheric data, and
                analyze various altitude-specific metrics. Get started by clicking the button below.
              </p>
              <Button onClick={handleStartCalculation}>Start Calculation</Button>
            </CardContent>
            <CardFooter>
              <a href="/learn-more" className="text-sm text-muted-foreground hover:underline">
                Learn more about how it works
              </a>
            </CardFooter>
          </Card>
        ) : (
          <div className="mx-auto max-w-4xl">
            <Tabs defaultValue="input" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="input">Input</TabsTrigger>
                <TabsTrigger value="output" disabled={!calculationPerformed}>Output</TabsTrigger>
                <TabsTrigger value="visualization" disabled={!calculationPerformed}>Visualization</TabsTrigger>
                <TabsTrigger value="analysis" disabled={!calculationPerformed}>Analysis</TabsTrigger>
              </TabsList>
              <TabsContent value="input">
                <Card>
                  <CardHeader>
                    <CardTitle>Input Parameters</CardTitle>
                    <CardDescription>Enter the required information for your airship lift analysis.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="weight">Total Weight (kg)</Label>
                          <div className="flex items-center">
                            <Input
                              id="weight"
                              placeholder="Enter weight"
                              value={weight}
                              onChange={(e) => setWeight(e.target.value)}
                            />
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="ml-2">
                                    <HelpCircle className="h-4 w-4" />
                                    <span className="sr-only">Weight info</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Enter the total weight of your airship in kilograms.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="altitude">Target Altitude (km)</Label>
                          <div className="flex items-center">
                            <Input
                              id="altitude"
                              placeholder="Enter altitude"
                              value={altitude}
                              onChange={(e) => setAltitude(e.target.value)}
                            />
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="ml-2">
                                    <HelpCircle className="h-4 w-4" />
                                    <span className="sr-only">Altitude info</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Enter the target altitude for your airship in kilometers.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="temp-range">Temperature Range (°C) (Optional)</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id="temp-min"
                              placeholder="Min"
                              value={tempMin}
                              onChange={(e) => setTempMin(e.target.value)}
                            />
                            <span>to</span>
                            <Input
                              id="temp-max"
                              placeholder="Max"
                              value={tempMax}
                              onChange={(e) => setTempMax(e.target.value)}
                            />
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <HelpCircle className="h-4 w-4" />
                                    <span className="sr-only">Temperature range info</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Enter the expected temperature range in Celsius (optional).</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Save className="mr-2 h-3 w-3" />
                      Save Config
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Upload className="mr-2 h-3 w-3" />
                      Load Config
                    </Button>
                    <Button type="submit" className="w-full sm:w-auto" onClick={handleSubmit}>
                      Calculate
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="output">
                <Card>
                  <CardHeader>
                    <CardTitle>Calculation Output</CardTitle>
                    <CardDescription>View the results of your airship lift analysis.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">Volume Calculation</h3>
                        <p>Required airship volume at sea level: {mockData.volumeCalculation.seaLevel} m³</p>
                        <p>Required airship volume at target altitude: {mockData.volumeCalculation.targetAltitude} m³</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Excess Lift</h3>
                        <p>Excess lift at sea level: {mockData.excessLift.seaLevel} kg</p>
                        <p>Excess lift at target altitude: {mockData.excessLift.targetAltitude} kg</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Atmospheric Properties</h3>
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Altitude (km)</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Density (kg/m³)</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Temperature (°C)</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Pressure (kPa)</th>
                          </tr>
                          </thead>
                          <tbody>
                          {mockData.atmosphericProperties.map((prop) => (
                            <tr key={prop.altitude} className="even:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{prop.altitude}</td>
                            <td className="border border-gray-300 px-4 py-2">{prop.density.toFixed(4)}</td>
                            <td className="border border-gray-300 px-4 py-2">{prop.temperature.toFixed(1)}</td>
                            <td className="border border-gray-300 px-4 py-2">{prop.pressure.toFixed(3)}</td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="calculation-details"
                          checked={showCalculationDetails}
                          onCheckedChange={setShowCalculationDetails}
                        />
                        <Label htmlFor="calculation-details">Show Calculation Details</Label>
                      </div>
                      {showCalculationDetails && (
                        <div className="rounded-md bg-muted p-4">
                          <h3 className="text-lg font-semibold">Calculation Details</h3>
                          <p>
                            The volume calculation is based on the ideal gas law: PV = nRT, where P is pressure, V is volume, n
                            is the number of moles of gas, R is the gas constant, and T is temperature.
                          </p>
                          <p>
                            Excess lift is calculated as the difference between the buoyant force and the weight of the airship:
                            Excess Lift = (ρ_air - ρ_helium) * g * V - W, where ρ is density, g is gravitational acceleration, V
                            is volume, and W is the weight of the airship.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                   
                      <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                      </Button>
                    
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="visualization">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Visualization</CardTitle>
                    <CardDescription>Interactive charts and graphs for your analysis.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div>
                      <h3 className="text-lg font-semibold mb-2">Altitude vs. Atmospheric Properties</h3>
                      <LineChart width={600} height={300} data={mockData.atmosphericProperties}>
                        
                        <Line type="monotone" dataKey="density" stroke="#8884d8" />
                        <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="pressure" stroke="#ffc658" />
                      </LineChart>
                      </div>
                      <div>
                      <h3 className="text-lg font-semibold mb-2">Altitude vs. Lift</h3>
                      <LineChart width={600} height={300} data={mockData.liftCapacity}>
                       
                        
                        <Line type="monotone" dataKey="lift" stroke="#8884d8" />
                      </LineChart>
                      </div>
                      <div>
                      <h3 className="text-lg font-semibold mb-2">Volume vs. Altitude</h3>
                      <BarChart width={600} height={300} data={mockData.volumeExpansion}>
                       
                        <Bar dataKey="volume" fill="#8884d8" />
                        <Bar dataKey="liftReserve" fill="#82ca9d" />
                      </BarChart>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analysis">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Analysis</CardTitle>
                    <CardDescription>In-depth analysis of your airship lift calculations.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div>
                        <h3 className="text-lg font-semibold">Critical Flight Stability Indicators</h3>
                        <div className="flex items-center space-x-2">
                          <p>Current Lift-to-Weight Ratio: 1.2</p>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <HelpCircle className="h-4 w-4" />
                                  <span className="sr-only">Lift-to-Weight Ratio info</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>A lift-to-weight ratio greater than 1 indicates positive buoyancy.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Trend Indicators</h3>
                        <div className="flex items-center space-x-2">
                          <Info className="h-4 w-4 text-yellow-500" />
                          <p>Approaching maximum altitude for current configuration</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Info className="h-4 w-4 text-green-500" />
                          <p>Lift reserve within optimal range</p>
                        </div>
                      </div>
                        <div>
                        <h3 className="text-lg font-semibold mb-2">Historical Data Comparison</h3>
                        <LineChart width={600} height={300} data={mockData.historicalData}>
                          <Line type="monotone" dataKey="liftToWeightRatio" stroke="#8884d8" />
                          
                        </LineChart>
                        </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Export Analysis Report
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  )
}