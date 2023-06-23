import logo from 'assets/images/ayvo_logo.png'
import logoDark from 'assets/images/ayvo_logo_dark.png'

import { useSelector } from 'react-redux'

// ==============================|| LOGO ||============================== //

const Logo = () => {
    const customization = useSelector((state) => state.customization)

    return (
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
            <img style={{ objectFit: 'contain', height: 'auto', width: 150 }} src={customization.isDarkMode ? logoDark : logo} alt='Ayvo' />
        </div>
    )
}

export default Logo
