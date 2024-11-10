'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GraduationCap, UserCog } from 'lucide-react'

// Mock data for student attendance
const mockAttendance = [
  { id: 1, name: "Alice Johnson", present: true },
  { id: 2, name: "Bob Smith", present: false },
  { id: 3, name: "Charlie Brown", present: true },
  { id: 4, name: "Diana Ross", present: true },
  { id: 5, name: "Ethan Hunt", present: false },
]

export default function TeacherDashboard() {
  const [attendanceCode, setAttendanceCode] = useState<string>("")
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)

  const generateAttendanceCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString()
    setAttendanceCode(newCode)
    setTimeLeft(60)
    setIsActive(true)
  }

  const resetCode = () => {
    setAttendanceCode("")
    setTimeLeft(0)
    setIsActive(false)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      if (interval) clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">EduTrack</h1>
          </div>
          <Button variant="ghost" className="flex items-center space-x-2">
            <UserCog className="h-5 w-5" />
            <span>Edit Profile</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="flex flex-col items-center mb-8 mt-8">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-6xl font-bold text-center mb-6 font-mono relative">
                {attendanceCode.split('').map((digit, index) => (
                  <span key={index} className="inline-block w-12 border-b-4 border-primary mx-1 pb-2">
                    {digit}
                  </span>
                ))}
                {!attendanceCode && "------"}
              </div>
              <div className="flex justify-between items-center mb-4">
                <Button onClick={generateAttendanceCode} className="w-1/2 text-lg py-6 bg-primary hover:bg-primary/90">
                  Generate Code
                </Button>
                <Button onClick={resetCode} className="w-1/2 text-lg py-6 ml-4 bg-secondary hover:bg-secondary/90">
                  Reset
                </Button>
              </div>
              {isActive && (
                <div className="text-center text-2xl font-bold text-primary">
                  Time left: {timeLeft}s
                </div>
              )}
              {!isActive && attendanceCode && (
                <div className="text-center text-2xl font-bold text-destructive">
                  Code Expired
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Student Attendance</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAttendance.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        student.present ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}>
                        {student.present ? "Present" : "Absent"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}