interface TabContentProps {
  className: string;
  content: React.ReactNode;
}

const TabContent = ({ className, content }: TabContentProps) => {
  return <div className={`tab-content ${className}`}>{content}</div>;
};

export default TabContent;
