import React, { useState } from "react";
import TabMenu from "./TabMenu";
import TabContent from "./TabContent";

interface TabLayoutProps {
  tabs: string[];
  tabContents: React.ReactNode[];
  className?: string;
}

const TabLayout = ({ tabs, tabContents, className }: TabLayoutProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={className}>
      <TabMenu tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
      <TabContent className="mt-2" content={tabContents[activeTab]} />
    </div>
  );
};

export default TabLayout;
