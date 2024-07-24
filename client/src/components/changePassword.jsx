import { Dialog } from '@headlessui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import Loading from './Loader';
import ModelWrapper from './ModelWrapper';
import Textbox from './Textbox';
import { toast } from 'sonner';
import { useChangePasswordMutation } from '../redux/slices/userApiSlice';

const ChangePassword = ({ open, setOpen }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    console.log(data);
    if (data.password !== data.cpass) {
      toast.warning("Passwords doesn't match");
      return;
    }
    try {
      const res = await changeUserPassword(data).unwrap();
      toast.success("New User added successfully");
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
    <ModelWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className=' '>
        <div className='mt-2 flex flex-col gap-6'>
        <Textbox
          label='Current Password'
          name='currentPassword'
          type='password'
          className="w-full rounded"
          register={register('currentPassword', { required: 'Current password is required' })}
          error={errors.currentPassword?.message}
        />
        <Textbox
          label='New Password'
          type='password'
          name='password'
          className="w-full rounded"
          register={register('password', { required: 'New password is required' })}
          error={errors.password?.message}
        />
        <Textbox
          label='Confirm Password'
          type='password'
          name='cpass'
          className="w-full rounded"
          register={register('cpass', { required: 'Please confirm your new password' })}
          error={errors.cpass?.message}
        />
        </div>
       
          {isLoading ? (
            <div className='py-5'>
                <Loading />
            </div>):(
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button type='submit' className="bg-blue-600 px-8 text-sm font-semiboldtext-white hover:bg-blue-700" label='save'>
               
              </Button>
              <Button className='bg-gray-200 px-8 text-sm font-semibold text-gray-900 hover:bg-gray-300' label='cancel' onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
            )}
          
      </form>
    </ModelWrapper>
    </>
  );
};

export default ChangePassword;


