'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dumbbell, Activity } from "lucide-react";
import EditableGymRoutineView from './gym/EditableGymRoutineView';
import CardioSessionsView from './cardio/CardioSessionsView';

export default function MainAppView() {
  const [activeTab, setActiveTab] = useState("gym");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="gym" className="flex items-center space-x-2">
                <Dumbbell className="w-4 h-4" />
                <span>Rutina Gym</span>
              </TabsTrigger>
              <TabsTrigger value="cardio" className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Cardio & Deportes</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="gym" className="mt-0">
            <EditableGymRoutineView />
          </TabsContent>
          
          <TabsContent value="cardio" className="mt-0">
            <CardioSessionsView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
