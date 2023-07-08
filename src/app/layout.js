'use client'
import '../styles/globals.css'
import React from "react";
import {Footer} from "@/components/Footer";

export default function Layout({ children }) {


  return (
      <html >
        <body>
        {children}
        <Footer/>
        </body>
      </html>
  )
}
