import Image from "../../atoms/images/Image";

interface EventCardProps {
  image: string;
  title: string;
  onClick?: () => void; // 클릭 시 실행될 함수 정의
}

const EventCard = ({ image, title, onClick }: EventCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-32 w-full overflow-hidden">
        <Image src={image} alt={title} variant="rounded" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="absolute bottom-0 w-full p-4">
        <h3 className="text-lg font-bold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default EventCard;
