import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Content.module.css';
import ThemeCake from '../Tabs/ThemeCake';
import AnniversaryCake from '../Tabs/AnniversaryCake';
import BirthdayCake from '../Tabs/BrithdayCake';
import CustomizedCake from '../Tabs/CustomizedCake';
import CoupleCake from '../Tabs/CoupleCake';

function Content() {
    const tabs = [
        { id: 'theme', label: 'Theme Cake' },
        { id: 'anniversary', label: 'Anniversary Cake' },
        { id: 'brithday', label: 'Brithday Cake' },
        { id: 'customized', label: 'Customized Cake' },
        { id: 'couple', label: 'Couple Cake' }
    ];

    const [activeTab, setActiveTab] = useState('theme');

    return (
        <div className={styles.appLayout}>
            <Header />
            <main className={styles.appContent}>
                <div className={styles.appInnerContent}>
                    <ul className={styles.tabsMenu}>
                        {tabs.map((tab, index) => (
                            <li
                                key={tab.id}
                                className={`${styles.tabItem} ${activeTab === tab.id ? styles.activeTab : ''}`}
                            >
                                <button onClick={() => setActiveTab(tab.id)}>
                                    {tab.label}
                                </button>
                                {index < tabs.length - 1 && <span className={styles.divider}></span>}
                            </li>
                        ))}
                    </ul>

                    <div>
                        {activeTab === 'theme' && <ThemeCake />}
                        {activeTab === 'anniversary' && <AnniversaryCake />}
                        {activeTab === 'customized' && <CustomizedCake />}
                        {activeTab === 'brithday' && <BirthdayCake />}
                        {activeTab === 'couple' && <CoupleCake />}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Content;
