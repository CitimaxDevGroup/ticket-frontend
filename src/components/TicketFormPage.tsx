import TicketForm from "./TicketForm";
import oreImage from './images/ore.jpg';

const TicketFormPage = () => {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden bg-white">
      <div
        className="hidden lg:block lg:w-2/5"
        style={{
          backgroundImage: `url(${oreImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '850px',
        }}
      ></div>
      <div className="w-full lg:w-3/5 p-10 border-none outline-none shadow-none flex flex-col justify-start">
        <TicketForm />
      </div>
    </div>
  );
};

export default TicketFormPage;
