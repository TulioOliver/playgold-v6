import React from "react";
import MainLayout from "./layout/MainLayout";
import RouterApp from "./router";

export default function App() {
  return (
    <MainLayout>
      <RouterApp />
    </MainLayout>
  );
}
