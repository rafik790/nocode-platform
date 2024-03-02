import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/Dialog';
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

interface CreateAppProps {
    children: React.ReactNode;
    title: string
    onClose: (refreshParent: boolean) => void;
    isOpen: boolean,
    appID: string
};

function CreateContentTypePopup({ children, title, onClose, isOpen, appID }: CreateAppProps) {
    const [modelName, setModelName] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const { mutate, isPending } = useMutation({
        mutationFn: () =>
            axiosPrivate({
                url: '/apps/' + appID + '/create-model',
                method: 'post',
                data: {
                    modelName: modelName,
                    fields: []
                },
            }),
        onSuccess: (response: any) => {
            const resposeData: any = response?.data;
            console.log(resposeData);
            setModelName('');
            toast.success(resposeData.message);
            onClose(true);
        },
        onError: (error: AxiosError) => {
            console.error("failed::", error);
            const resposeData: any = error.response?.data;
            toast.error(resposeData.message)
        }

    });


    return (
        <>
            <Dialog onOpenChange={open => {
                if (!open) onClose(false);
            }} open={isOpen}>
                <DialogTrigger>{children}</DialogTrigger>
                <DialogContent className="gap-0">
                    <DialogHeader className="space-y-3">
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <div className="w-full max-w-md mx-auto bg-white p-8 rounded">
                        <form
                            className="flex flex-grow flex-col"
                            onSubmit={e => {
                                e.preventDefault();
                                mutate();
                            }}
                        >
                            <div className="mb-4">
                                <label htmlFor="appName" className="block text-gray-600 text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    id="appName"
                                    name="appName"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    value={modelName}
                                    onChange={(e) => setModelName(e.target.value)}
                                />
                            </div>
                            <Button
                                disabled={false}
                                isLoading={isPending}
                                className="gap-2.5"
                            >
                                <span>Save</span>
                            </Button>

                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
};
export default CreateContentTypePopup;