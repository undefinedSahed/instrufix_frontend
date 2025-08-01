"use client";
import axios from "axios";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface ReviewModalProps {
  setIsModalOpen: (isModalOpen: boolean) => void;
  setIsOpen : (isOpen  : boolean) => void;
  businessID: string;
}

const VerifyBusinessEmail: React.FC<ReviewModalProps> = ({
  setIsModalOpen,
  businessID,
  setIsOpen
}) => {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;

    const verificationEmail = { email: email };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/claim-bussiness/send-otp/${businessID}`,
        verificationEmail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Verification email send. Please check your email.");
      setIsOpen(true)
    } catch (error) {
      console.log(`error from verify business : ${error}`);
      toast.error("Failed to send verification email!");
    } finally {
      setLoading(false);
      setIsModalOpen(false)
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 min-h-screen">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 ">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="text-center text-xl font-semibold">
              Enter Your Business Email
            </div>

            <div>
              <input
                type="email"
                className="border border-gray-200 bg-gray-50 h-[48px] w-full rounded-lg my-5 focus:outline-none p-4"
                placeholder="Enter your business email"
                name="email"
              />
            </div>

            <div className="flex items-center gap-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-[48px] border border-gray-200 w-full text-center rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`h-[48px] bg-teal-600 w-full text-center rounded-lg text-white ${
                  loading && "opacity-70"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Submitting
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyBusinessEmail;
