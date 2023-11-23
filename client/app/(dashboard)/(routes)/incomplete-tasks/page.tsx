"use client"
import Heading from '@/components/heading';
import axios from 'axios';
import { LayoutList, Trash2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {}

const IncompleteTaskPage = (props: Props) => {
  const [todoList, setTodoList] = useState(null);
  let user;

  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem('User')!);
  }
  
  const getTodoList = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/todo/inCompleteTodoList/${user._id}`);
    //   console.log("Completed tasks: ", response.data.todoList);
      setTodoList(response.data.todoList);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getTodoList()
  }, []);

  const handleDelete = async (todoId: string) => {
    try {
      await axios.post(`http://localhost:3001/todo/delete/${user._id}`, {
        todoId: todoId
      });
      toast.success('Deleted todo item successfully!')
      getTodoList();
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Error deleting todo!");
    }
  }

  const formattedDate = (date: string) => {
    const updatedDate = new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return updatedDate;
  };
  
  return (
    <main className='flex flex-col gap-5 px-5'>
      <div className='flex flex-row justify-between'>
        <Heading
          title="Incomplete Tasks"
          description="Check your incomplete tasks and delete"
          icon={LayoutList}
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
        />
      </div>
      <section className='flex flex-row flex-wrap gap-5 w-full justify-center'>
        {todoList?.length > 0 ? (
            todoList.map((todo) => (
                <div key={todo?._id} className='flex flex-col gap-5 w-full md:w-[350px] h-fit p-5 shadow-lg rounded-xl bg-white'>
                    <div className='flex flex-row justify-between items-center'>
                        <h2 className='text-xl font-semibold'>{todo?.todoName}</h2>
                    </div>
                    <p className='text-gray-700 w-11/12'>{todo?.todoDescription}</p>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex flex-col gap-1 text-center cursor-pointer'>
                            <span className='text-xs text-gray-500'>{formattedDate(todo?.createdAt)}</span>
                            <span
                                className='text-sm font-semibold bg-red-500 text-white rounded-full text-center px-5 py-2'>
                                Incomplete
                            </span>
                        </div>
                        <div className='flex flex-row gap-3'>
                            <Trash2Icon className='w-5 h-5 cursor-pointer text-red-500 hover:text-red-600'
                                onClick={() => handleDelete(todo._id)} />
                        </div>
                    </div>
                </div>
            ))
            ) : (
                <div>Empty</div>
            )}
        </section>
    </main>
  )
}

export default IncompleteTaskPage