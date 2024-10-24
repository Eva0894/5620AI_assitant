import React from 'react';
import './shopping.css'; 

const ShoppingPage = () => {
    return (
        <div>
            <header>
                <h1>Welcome to CareMate Senior Shopping</h1>
                <p>Products specially designed for seniors' comfort and well-being.</p>
            </header>

            <div className="product-grid">
                    <div className="product-card">
                        <img src="https://cdn11.bigcommerce.com/s-pem0vhg/images/stencil/1280x1280/products/1106/4735/hearing-savers-unitron-moxi-vivante-hearing-aid__18284.1682558720.jpg?c=2?imbypass=on" alt="Hearing Aid" />
                        <h2>Hearing Aid</h2>
                        <h2>$ 3,120</h2>
                        <p>State-of-the-art hearing aid for enhanced hearing and comfort.</p>
                    </div>
                    
                    <div className="product-card">
                        <img src="https://m.media-amazon.com/images/I/51CyPS7T4SL._AC_SL1059_.jpg" alt="Walking Cane" />
                        <h2>Adjustable Walking Cane</h2>
                        <h2>$ 239.28</h2>
                        <p>Sturdy and lightweight cane with ergonomic design for support.</p>
                    </div>
                
                <div className="product-card">
                    <img src="https://garsupply.com/cdn/shop/products/HC0771.jpg?v=1675716304&width=1600" alt="Blood Pressure Monitor" />
                    <h2>Blood Pressure Monitor</h2>
                    <h2>$ 36.5</h2>
                    <p>Easy-to-use digital monitor for tracking blood pressure at home.</p>
                </div>
                
                <div className="product-card">
                    <img src="https://www.relaxforlife.com.au/cdn/shop/files/OHCOM.8NEO_UPRIGHT_DOORSOPEN_0_straighton__MIDNIGHT_6.23.2023.png?v=1701064183" alt="Comfort Chair" />
                    <h2>Reclining Comfort Chair</h2>
                    <h2>$ 16,999</h2>
                    <p>Soft, adjustable chair with added lumbar support for relaxation.</p>
                </div>
                
                <div className="product-card">
                    <img src="https://outfitocean.com/cdn/shop/files/713HLYbqegL_1400x.jpg?v=1724078707" alt="Pill Organizer" />
                    <h2>Weekly Pill Organizer</h2>
                    <h2>$ 111</h2>
                    <p>Helps manage daily medications with easy-to-read compartments.</p>
                </div>
                
                <div className="product-card">
                    <img src="https://m.media-amazon.com/images/I/81csvdzi-6L._AC_SX679_.jpg" alt="Compression Socks" />
                    <h2>Compression Socks</h2>
                    <h2>$ 30.55</h2>
                    <p>Improves blood circulation and reduces leg swelling.</p>
                </div>

                <div className="product-card">
                    <img src="https://www.falconmobility.au/cdn/shop/files/F2UltraLight.jpg?v=1728467918g" alt="Scooter" />
                    <h2>Scooter (18 kg)</h2>
                    <h2>$ 3,697</h2>
                    <p>Lightweight mobility scooter for easy transportation and outdoor use.</p>
                </div>

                <div className="product-card">
                    <img src="https://assets.woolworths.com.au/images/1005/1075717492.jpg?impolicy=wowsmkqiema&w=1200&h=1200g" alt="Compression Socks" />
                    <h2>AUSWHEEL 4 Wheel Rollator Walker</h2>
                    <h2>$ 174.95</h2>
                    <p>ILightweight, folding medical walker with seat, perfect for seniors, in red steel.</p>
                </div>
            </div>
        </div>
    );
};

export default ShoppingPage;
