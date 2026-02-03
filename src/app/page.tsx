import { Header, Footer } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Powered by shadcn/ui
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Welcome to Flexible Form
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A professional Next.js application built with TypeScript, Tailwind CSS, shadcn/ui
              and best practices for scalable development.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Alert Section */}
          <div className="mt-12">
            <Alert>
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                This project includes 36+ shadcn/ui components ready to use.
              </AlertDescription>
            </Alert>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="components" className="mt-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="demo">Demo Form</TabsTrigger>
            </TabsList>

            <TabsContent value="components" className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>36+ Components</CardTitle>
                    <CardDescription>Fully customizable UI components</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Button, Card, Input, Dialog, Select, Form, and many more components ready
                      to use.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>TypeScript First</CardTitle>
                    <CardDescription>Fully typed components</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      All components are fully typed with TypeScript for better developer
                      experience.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Customizable</CardTitle>
                    <CardDescription>Tailwind CSS powered</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Easy to customize with Tailwind CSS classes and CSS variables.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Structure</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Badge variant="outline">src/components/ui</Badge>
                    <Badge variant="outline">src/lib</Badge>
                    <Badge variant="outline">src/hooks</Badge>
                    <Badge variant="outline">src/utils</Badge>
                    <p className="text-sm text-muted-foreground pt-2">
                      Organized folder structure following industry best practices.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Developer</p>
                        <p className="text-xs text-muted-foreground">dev@example.com</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-3 w-[150px]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="demo" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Enter your information below to create your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Account</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
