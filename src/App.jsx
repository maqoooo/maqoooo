import React, { useState, useCallback, useMemo } from 'react'
import HomeScreen from './screens/HomeScreen.jsx'
import MapScreen from './screens/MapScreen.jsx'
import WalletScreen from './screens/WalletScreen.jsx'
import DiscountsScreen from './screens/DiscountsScreen.jsx'
import OfferScreen from './screens/OfferScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import BottomNav from './components/BottomNav.jsx'

const COLORS = {
  navy: '#0B1E3F',
  red: '#D81E3F',
  blue: '#1E88E5',
  lightBlue: '#29A0F0',
  bg: '#F4F6FB',
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [offerData, setOfferData] = useState(null)

  const openOffer = useCallback((data) => {
    setOfferData(data)
    setActiveTab('offer')
  }, [])

  const goBack = useCallback(() => {
    setActiveTab('discounts')
  }, [])

  const screen = useMemo(() => {
    switch (activeTab) {
      case 'home': return <HomeScreen onOpenOffer={openOffer} />
      case 'map': return <MapScreen onOpenOffer={openOffer} />
      case 'wallet': return <WalletScreen />
      case 'discounts': return <DiscountsScreen onOpenOffer={openOffer} />
      case 'offer': return <OfferScreen data={offerData} onBack={goBack} />
      case 'profile': return <ProfileScreen />
      default: return <HomeScreen onOpenOffer={openOffer} />
    }
  }, [activeTab, offerData, openOffer, goBack])

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: COLORS.bg,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }} key={activeTab} className="screen-enter">
        {screen}
      </div>
      {activeTab !== 'offer' && (
        <BottomNav active={activeTab} onChange={setActiveTab} />
      )}
    </div>
  )
}
