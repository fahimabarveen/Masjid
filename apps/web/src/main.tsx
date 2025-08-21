import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { WebAppLayout } from './ui/WebAppLayout'

const root = createRoot(document.getElementById('root')!)
root.render(<WebAppLayout />)


