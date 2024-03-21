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
import { Switch } from '../ui/Switch';

interface CreateAppProps {
    children: React.ReactNode;
    title: string
    onClose: (refreshParent: boolean) => void;
    isOpen: boolean,
    appID: string,
    modelID: string,
    entityFieldAdded: boolean
};

function AddEditFieldPopup({ children, title, onClose, isOpen, appID, modelID, entityFieldAdded }: CreateAppProps) {
    const [fieldID, setFieldID] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [fieldType, setFieldType] = useState('');
    const [isEntityField, setEntityField] = useState(false);
    const [isUniqueField, setUniqueField] = useState(false);
    const [isRequiredField, setRequiredField] = useState(false);
    
    const axiosPrivate = useAxiosPrivate();
    const { mutate, isPending } = useMutation({
        mutationFn: () =>
            axiosPrivate({
                url: '/apps/' + appID + '/models/' + modelID,
                method: 'post',
                data: {
                    fields: [{
                        fieldID: fieldID,
                        fieldName: fieldName,
                        fieldType: fieldType,
                        isUniqueField: isUniqueField,
                        isRequiredField: isRequiredField,
                        isEntityField: isEntityField
                    }]
                },
            }),
        onSuccess: (response: any) => {
            const resposeData: any = response?.data;
            console.log(resposeData);
            setFieldID('');
            setFieldName('');
            setFieldType('');
            setUniqueField(false);
            setRequiredField(false);
            setEntityField(false);
            toast.success(resposeData.message);
            onClose(true);
        },
        onError: (error: AxiosError) => {
            console.error("failed::", error);
            const resposeData: any = error.response?.data;
            toast.error(resposeData.message)
        }

    });

    const changeFieldHandler = (selecedValue:string) => {
        setFieldType(selecedValue);
        if(selecedValue=="ReferenceType"){

        }
    }

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
                                <label htmlFor="fieldName" className="block text-gray-600 text-sm font-medium mb-2">Field Name</label>
                                <input
                                    type="text"
                                    id="fieldName"
                                    name="fieldName"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    value={fieldName}
                                    onChange={(e) => setFieldName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="fieldID" className="block text-gray-600 text-sm font-medium mb-2">Field ID</label>
                                <input
                                    type="text"
                                    id="fieldID"
                                    name="fieldID"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    value={fieldID}
                                    onChange={(e) => setFieldID(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="fieldID" className="block text-gray-600 text-sm font-medium mb-2">Field Type</label>
                                <select value={fieldType}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    onChange={(e) => changeFieldHandler(e.target.value)}
                                >
                                    <option value="">Select an option</option>
                                    <option value="RichText">Rich Text</option>
                                    <option value="Text">Text</option>
                                    <option value="Number">Number</option>
                                    <option value="Boolean">Boolean</option>
                                    <option value="DateTime">Date Time</option>
                                    <option value="ReferenceType">Reference Type</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <Switch
                                    className="data-[state=unchecked]:bg-primary"
                                    checked={isEntityField}
                                    onCheckedChange={setEntityField}
                                    disabled={entityFieldAdded}
                                />
                                <span>&nbsp;Entity Field</span>
                            </div>
                            <div className="mb-4">
                                <Switch
                                    className="data-[state=unchecked]:bg-primary"
                                    checked={isRequiredField}
                                    onCheckedChange={setRequiredField}
                                />
                                <span>&nbsp;Required Field</span>
                            </div>
                            <div className="mb-4">
                                <Switch
                                    className="data-[state=unchecked]:bg-primary"
                                    checked={isUniqueField}
                                    onCheckedChange={setUniqueField}
                                />
                                <span>&nbsp;Unique Field</span>
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
export default AddEditFieldPopup;