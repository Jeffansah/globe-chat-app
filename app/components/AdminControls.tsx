import DeleteChat from "./DeleteChat";
import InviteUser from "./InviteUser";

const AdminControls = ({ chatId }: { chatId: string }) => {
  return (
    <div className="flex justify-end max-sm:justify-center space-x-2 m-5 mb-0">
      <InviteUser chatId={chatId} />
      <DeleteChat chatId={chatId} />
    </div>
  );
};

export default AdminControls;
