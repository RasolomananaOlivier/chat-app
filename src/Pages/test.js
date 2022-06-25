import { Button } from '@mui/material'
import { AnimateSharedLayout, motion } from 'framer-motion'
import React, { useState } from 'react'

export default function Test() {
    const [open, setOpen] = useState(false)
    return (
        <AnimateSharedLayout>

            {!open && <motion.div layoutId='me' style={{ height: '100px', width: '50px', backgroundColor: 'red' }}>hy</motion.div>}
            <motion.div layout style={{ height: '100px', width: '50px', backgroundColor: 'blue' }}>hy</motion.div>
            {open && <motion.div layoutId='me'
                style={{ height: '100px', width: '50px', backgroundColor: 'red', position: 'absolute', bottom: 0 }}>hy</motion.div>}
            <Button onClick={() => {
                setOpen(!open)
            }}>click</Button>

        </AnimateSharedLayout>
    )
}
