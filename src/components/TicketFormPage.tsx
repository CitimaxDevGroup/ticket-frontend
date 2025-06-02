import TicketForm from "./TicketForm";
import oreImage from './images/ore.jpg';

const TicketFormPage = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col lg:flex-row bg-white">
      <div
        className="w-full lg:w-2/5 h-64 lg:h-auto"
        style={{
          backgroundImage: `url(${oreImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      ></div>

      <div className="w-full lg:w-3/5 flex items-center justify-center p-4">
        <TicketForm />
      </div>
    </div>
  );
};

export default TicketFormPage;
