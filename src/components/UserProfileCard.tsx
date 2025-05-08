
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users } from "lucide-react";

const UserProfileCard = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">User Profile</CardTitle>
        <CardDescription>Your account information and status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" />
            <AvatarFallback className="bg-adtech-purple/20">AD</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div>
              <h3 className="font-semibold">Aditya Sharma</h3>
              <p className="text-sm text-muted-foreground">Marketing Director</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-adtech-blue hover:bg-adtech-blue/90">Premium Account</Badge>
              <Badge variant="outline">3 Years</Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <Users size={12} />
                <span>Team of 12</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays size={12} />
                <span>Joined May 2021</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
