'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Icons } from '@/components/ui/icons'
import Header from '@/components/header'

export default function SignInPage() {
  const [userType, setUserType] = useState<'student' | 'teacher'>('student')

  return (
    <>
    <Header />
    <div className="container flex items-center justify-center min-h-screen px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1 items-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">Sign in to your account</CardTitle>
          <CardDescription>Enter your details below to access your account</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <RadioGroup defaultValue="student" onValueChange={(value) => setUserType(value as 'student' | 'teacher')} className="grid grid-cols-2 gap-4">
            <div>
              <RadioGroupItem value="student" id="student" className="peer sr-only" />
              <Label
                htmlFor="student"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Icons.graduationCap className="mb-3 h-6 w-6" />
                Student
              </Label>
            </div>
            <div>
              <RadioGroupItem value="teacher" id="teacher" className="peer sr-only" />
              <Label
                htmlFor="teacher"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Icons.users className="mb-3 h-6 w-6" />
                Teacher
              </Label>
            </div>
          </RadioGroup>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="abc.1234@muj.manipal.edu" />
          </div>
          {userType === 'student' && (
            <div className="grid gap-2">
              <Label htmlFor="regNo">Registration Number</Label>
              <Input id="regNo" placeholder="Enter your registration number" />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full">Sign in</Button>
          <p className="mt-2 text-xs text-center text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
    </>
  )
}