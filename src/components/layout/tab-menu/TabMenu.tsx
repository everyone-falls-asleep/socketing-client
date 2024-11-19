interface TabMenuProps {
  tabs: string[];
  activeTab: number;
  onTabClick: (index: number) => void;
}

const TabMenu = ({ tabs, activeTab, onTabClick }: TabMenuProps) => {
  return (
    <div className="tabs tab-group">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`tab tab-menu ${
            activeTab === index ? "tab-menu-active" : "tab-menu-inactive"
          }`}
          onClick={() => onTabClick(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabMenu;
