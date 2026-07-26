import FAQAccordion from './FAQAccordion';
import SubscribeBox from './SubscribeBox';
import BrowseTopics from './BrowseTopics';

export default function BlogSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <FAQAccordion />
      <SubscribeBox />
      <BrowseTopics />
    </aside>
  );
}
