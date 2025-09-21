import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Eye, EyeOff } from "lucide-react";
import kifLogo from "@assets/B_1758455614771.png";

interface AuthFormProps {
  onSubmit?: (data: any) => void;
}

export default function AuthForm({ onSubmit }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ mobile: "", password: "" });
  const [registerData, setRegisterData] = useState({ 
    name: "", 
    mobile: "", 
    password: "", 
    studentId: null as File | null 
  });

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRegisterData(prev => ({ ...prev, studentId: file }));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', loginData);
    onSubmit?.(loginData);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt:', registerData);
    onSubmit?.(registerData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src={kifLogo} alt="KIF" className="w-16 h-16 mx-auto mb-4" data-testid="logo-auth" />
          <CardTitle className="text-2xl">Welcome to KIF</CardTitle>
          <CardDescription>Knowledge is Free - Join the student community</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2" data-testid="tabs-auth">
              <TabsTrigger value="login" data-testid="tab-login">Sign In</TabsTrigger>
              <TabsTrigger value="register" data-testid="tab-register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-mobile">Mobile Number</Label>
                  <Input
                    id="login-mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={loginData.mobile}
                    onChange={(e) => setLoginData(prev => ({ ...prev, mobile: e.target.value }))}
                    data-testid="input-mobile-login"
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      data-testid="input-password-login"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full" data-testid="button-login-submit">
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                    data-testid="input-name-register"
                  />
                </div>
                <div>
                  <Label htmlFor="register-mobile">Mobile Number</Label>
                  <Input
                    id="register-mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={registerData.mobile}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, mobile: e.target.value }))}
                    data-testid="input-mobile-register"
                  />
                </div>
                <div>
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                    data-testid="input-password-register"
                  />
                </div>
                <div>
                  <Label htmlFor="student-id">Student ID Card</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <input
                      id="student-id"
                      type="file"
                      accept="image/*"
                      onChange={handleIdUpload}
                      className="hidden"
                      data-testid="input-student-id"
                    />
                    <label htmlFor="student-id" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {registerData.studentId ? registerData.studentId.name : "Upload Student ID Card"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG up to 10MB
                      </p>
                    </label>
                  </div>
                </div>
                <Button type="submit" className="w-full" data-testid="button-register-submit">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}