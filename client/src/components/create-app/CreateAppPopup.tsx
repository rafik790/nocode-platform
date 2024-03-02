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
    onClose: (refreshParent:boolean) => void;
    isOpen: boolean
};

function CreateAppPopup({ children, title, onClose, isOpen }: CreateAppProps) {
    const [appName, setAppName] = useState('');
    const [appDomain, setAppDomain] = useState('');
    const [appDesc, setAppDesc] = useState('');

    const axiosPrivate = useAxiosPrivate();
    const { mutate, isPending } = useMutation({
        mutationFn: () =>
            axiosPrivate({
                url: '/apps',
                method: 'post',
                data: {
                    appName: appName,
                    appDesc: appDesc,
                    appDomain: appDomain
                },
            }),
        onSuccess: (response: any) => {
            const resposeData: any = response?.data;
            console.log(resposeData);

            setAppName('');
            setAppDesc('');
            setAppDomain('');
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
                    <div className="max-w-md mx-auto bg-white p-8 rounded">
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
                                    value={appName}
                                    onChange={(e) => setAppName(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="appDomain" className="block text-gray-600 text-sm font-medium mb-2">Domain</label>
                                <input
                                    type="text"
                                    id="appDomain"
                                    name="appDomain"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    value={appDomain}
                                    onChange={(e) => setAppDomain(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-600 text-sm font-medium mb-2">Description</label>
                                <textarea
                                    id="appDesc"
                                    name="appDesc"
                                    rows={4}
                                    cols={50}
                                    value={appDesc}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    onChange={(e) => setAppDesc(e.target.value)}
                                >

                                </textarea>
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
export default CreateAppPopup;