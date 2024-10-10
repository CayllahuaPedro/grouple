import React from "react"
import LandingPageNavBar from "./_components/navbar"
interface LandingPageLayoutProps {
    children: React.ReactNode
}
const LandingPageLayout = ({ children }: LandingPageLayoutProps) => {
    return (
        <div className="flex flex-col container relative">
            <LandingPageNavBar />
            {children}
        </div>
    )
}

export default LandingPageLayout
