"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Edit3, LoaderIcon } from "lucide-react";
import axios from "axios";
import Dropzone from 'react-dropzone';
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Registerpage = () => {
  const router = useRouter();
  const [values, setValues] = useState({ picture: null });
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const onDrop = async (acceptedFiles: any) => {
    setUploading(true);
    setValues({ picture: acceptedFiles[0] });

    const data = new FormData();
    data.append('file', acceptedFiles[0]);
    data.append("upload_preset", 'eduzone');
    data.append('cloud_name', 'ddcpocb6l');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/ddcpocb6l/image/upload', {
        method: 'POST',
        body: data
      });

      const responseData = await response.json();
      setImageUrl(responseData?.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const signupSchema = z.object({
    fullname: z.string().min(3, {
      message: "Please enter your name!"
    }),
    username: z.string().min(3, {
      message: "Please enter your username!"
    }),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    cpassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    profession: z.string().min(2, {
      message: "Profession must be at least 2 characters.",
    }),
  }).refine(data => data.password === data.cpassword, {
    message: "Confirm Password and Password must be the same",
    path: ["cpassword", "password"],
  });

  type SignupSchema = z.infer<typeof signupSchema>;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupSchema) => {
    try {
      console.log("Form data: ", data);
      const response = await axios.post('http://localhost:3001/register', {
        fullName: data.fullname,
        userName: data.username,
        email: data.email,
        password: data.password,
        occupation: data.profession,
        picturePath: imageUrl,
        todos: []
      });

      console.log("Response:", response);

      if (response.status === 201) {
        console.log("User registered: ", response);
        reset();
        toast.success("User registered successfully!");
        router.push('/');  
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className='flex flex-col sm:flex-row min-h-screen'>
      <div className='w-full sm:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-10 gap-2'>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center text-xl font-bold rounded-full">NX</span>
              <span className="text-3xl font-bold text-gray-400">NexTask</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Empowering Your Every Task with NexTask!</p>
          </div>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
          <Input
            type="text"
            placeholder="Your Full Name"
            {...register('fullname')}
            className="p-2 border border-gray-300 focus:outline-none w-full rounded-md"
          />
          {errors.fullname && (
            <p>{`${errors.fullname.message}`}</p>
          )}
          <Input
            type="text"
            placeholder="Your username"
            {...register('username')}
            className="p-2 border border-gray-300 focus:outline-none w-full rounded-md"
          />
          {errors.username && (
            <p>{`${errors.username.message}`}</p>
          )}
          <Input
            type="email"
            placeholder="Your email address"
            {...register('email')}
            className="p-2 border border-gray-300 focus:outline-none w-full rounded-md"
          />
          {errors.email && (
            <p>{`${errors.email.message}`}</p>
          )}
          <Input
            type="password"
            placeholder="Your password"
            {...register('password')}
            className="p-2 border border-gray-300 focus:outline-none w-full rounded-md"
          />
          {errors.password && (
            <p>{`${errors.password.message}`}</p>
          )}
          <Input
            type="password"
            placeholder="Your Confirm password"
            {...register('cpassword')}
            className="p-2 border border-gray-300 focus:outline-none w-full rounded-md"
          />
          {errors.cpassword && (
            <p>{`${errors.cpassword.message}`}</p>
          )}
          <Input
            type="text"
            placeholder="Your profession name"
            {...register('profession')}
            className="p-2 border border-gray-300 focus:outline-none w-full rounded-md"
          />
          {errors.profession && (
            <p>{`${errors.profession.message}`}</p>
          )}
          <Dropzone onDrop={onDrop} disabled={uploading}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="border-2 border-dashed p-5">
                {uploading ? (
                  <div className="flex flex-row gap-2 justify-center items-center">
                    <LoaderIcon className="animate-spin" />
                    <span>Uploading....</span>
                  </div>
                  ) : !values.picture ? (
                      <>
                        <Input {...getInputProps()} />
                        <p>Add picture here</p>
                      </>
                  ) : (
                    <div className="flex flex-row justify-between px-5 items-center">
                      <h1>{values.picture.name}</h1>
                      <Edit3 />
                    </div>
                  )
                }
              </div>
            )}
          </Dropzone>
          <Button
            disabled={isSubmitting}
            variant='secondary'
            type="submit"
            className="py-2 rounded-md bg-blue-500 hover:rounded-xl transition-all w-full"
          >
            {isSubmitting ? (
              <div className="flex flex-row gap-2 justify-center items-center">
                <LoaderIcon className="animate-spin"/>
                Signing in.....
              </div>
            ) : (
              <div className="text-white">Signup Now</div>)}
          </Button>
        </form>
        <hr />
        <div className="flex flex-row items-center">
          <span>Already have an account?</span>
          <Link href='/'>
            <Button variant='link'>Signin</Button>
          </Link>
        </div>
      </div>
      <img src="/register.jpg" alt="" className="w-full sm:w-1/2 object-cover" />
    </main>
  );
};

export default Registerpage;
