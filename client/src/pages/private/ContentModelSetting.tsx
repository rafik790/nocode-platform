import { DataTable } from "@/components/content-model-settings/DataTable";
import { DataTableColumnHeader } from "@/components/shared/data-table/DataTableColumnHeader";
import DataTableShimmer from "@/components/shared/data-table/DataTableShimmer";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ContentModelFieldType, ContentModelType } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Error from './../Error';

const ContentModelSetting = () => {
    const { appID, modelID } = useParams<{ appID: string, modelID: string }>();
    const [searchParams] = useSearchParams();

    const axiosPrivate = useAxiosPrivate();
    const params = {
        appID: appID,
        modelID: modelID,
        page: searchParams.get('page') || 0,
        pageSize: searchParams.get('pageSize') || 10,
        sort: searchParams.get('sort') || '-createdAt',
        search: searchParams.get('query'),
    };

    const { data, isPending, isError, isFetching } = useQuery<ContentModelType>({
        queryKey: ['model-fields', params],
        queryFn: () =>
            axiosPrivate({
                url: '/apps/' + appID + '/models/' + modelID,
                params
            }).then((res) => {
                let data = res.data.data

                let entityColumns = data.fields.filter((field: any) => field.isEntityField === true);
                if (entityColumns && entityColumns.length > 0) {
                    data.isEntityFieldAdded = true;
                }
                return data;
            }),
        placeholderData: keepPreviousData,
    });

    const columns: ColumnDef<ContentModelFieldType>[] = useMemo(
        () => [
            {
                accessorKey: 'fieldID',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Field ID" />
                ),
                canSort: false,
            },
            {
                accessorKey: 'fieldName',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Display Name" />
                ),
                canSort: false,
            },
            {
                accessorKey: 'fieldType',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Field Type" />
                ),
                canSort: false,
            },
            {
                accessorKey: 'isUniqueField',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Unique Field" />
                ),
                canSort: false,
            },
            {
                accessorKey: 'isRequiredField',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Required Field" />
                ),
                canSort: false,
            },
            {
                accessorKey: 'isEntityField',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Entity Field" />
                ),
                canSort: false,
            }
        ],
        [],
    );

    if (isPending) return <DataTableShimmer columns={2} />;
    if (isError) return <Error fullScreen={false} />;
    return (
        <>
            <div className="flex h-screen">
                <div className="w-64">
                    <div className="p-2">
                        <ul>
                            <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">Fields</a></li>
                            <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">About</a></li>
                            <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">Services</a></li>
                            <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">Contact</a></li>
                            <li>
                                <Link to={"/app/" + appID + "/content-model"} className="block py-2 px-4 hover:bg-gray-700">
                                    Back
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-1">
                    <DataTable<ContentModelFieldType, string>
                        columns={columns}
                        data={data?.fields}
                        isFetching={isFetching}
                        model={data}
                        clickHandler={fieldID => {
                            console.log("fieldID::", fieldID);
                            //window.open(window.location.origin + '/forms/' + formId, '_blank');
                            //navigate('/app/' + appID + '/content-model/' + modleID, { replace: true });
                        }}
                        appID={appID!}
                    />
                </div>
            </div>
        </>

    )
};
export default ContentModelSetting;