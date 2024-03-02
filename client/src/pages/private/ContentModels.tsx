import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import {
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { ContentModelType, PaginatedResponseType } from "@/types";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox";
import { DataTableColumnHeader } from "@/components/shared/data-table/DataTableColumnHeader";
import { Switch } from "@/components/ui/Switch";
import DataTableShimmer from "@/components/shared/data-table/DataTableShimmer";
import Error from './../Error';
import { DataTable } from "@/components/content-models/DataTable";

interface ContentModelResponseType extends PaginatedResponseType {
    dataList: ContentModelType[];
}

dayjs.extend(relativeTime);
const ContentModelsView = () => {
    const [searchParams] = useSearchParams();
    const { appID } = useParams<{ appID: string }>();
    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate();
    const params = {
        appID: appID,
        page: searchParams.get('page') || 0,
        pageSize: searchParams.get('pageSize') || 10,
        sort: searchParams.get('sort') || '-createdAt',
        search: searchParams.get('query'),
    };

    const { data, isPending, isError, isFetching } = useQuery<ContentModelResponseType>({
        queryKey: ['models', params],
        queryFn: () =>
            axiosPrivate({
                url: '/apps/' + appID + '/models',
                params
            }).then(res => res.data.data),
        placeholderData: keepPreviousData,
    });

    const columns: ColumnDef<ContentModelType>[] = useMemo(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected()}
                        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={value => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        onClick={e => e.stopPropagation()}
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: 'isActive',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Status" />
                ),
                cell: ({ row }) => (
                    <Switch
                        checked={row.original.isActive}
                        onClick={e => e.stopPropagation()}
                    />
                ),
            },
            {
                accessorKey: 'modelName',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Name" />
                ),
            },
            {
                accessorKey: 'fields.length',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Fields" />
                ),
            },
            {
                accessorKey: 'createdAt',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Created Date" />
                ),
                cell: ({ row }) => (
                    <span>{dayjs(row.original.createdAt).format('MMM D, YYYY')}</span>
                ),
            },
            {
                accessorKey: 'updatedAt',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Last Updated" />
                ),
                cell: ({ row }) => (
                    <span>{dayjs(row.original.updatedAt).fromNow()}</span>
                ),
            }
        ],
        [],
    );

    if (isPending) return <DataTableShimmer columns={4} />;
    if (isError) return <Error fullScreen={false} />;

    return (
        <DataTable<ContentModelType, string>
            columns={columns}
            data={data.dataList}
            totalEntries={data.total}
            isFetching={isFetching}
            bulkDeleteHandler={forms => {
                console.log("Forms:", forms);
            }}
            bulkDeleteIsLoading={false}
            clickHandler={modleID => {
                //window.open(window.location.origin + '/forms/' + formId, '_blank');
                navigate('/app/' + appID + '/content-model/' + modleID, { replace: true });
            }}
            appID={appID!}
        />
    )
};
export default ContentModelsView;