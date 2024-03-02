import { useEffect, useState } from 'react';
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { PlusSquare, Trash2Icon } from 'lucide-react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/Table';
import { DataTablePagination } from '../shared/data-table/DataTablePagination';
import { useSearchParams } from 'react-router-dom';
import SearchInput from '../shared/SearchInput';
import { Button } from '../ui/Button';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/AlertDialog';
import CreateContentTypePopup from './CreateContentTypePopup';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    totalEntries: number;
    bulkDeleteHandler: (items: string[]) => void;
    bulkDeleteIsLoading: boolean;
    isFetching?: boolean;
    clickHandler?: (id: string) => void;
    appID: string;
}

export function DataTable<TData extends { modelID: string }, TValue>({
    columns,
    data,
    totalEntries,
    bulkDeleteHandler,
    bulkDeleteIsLoading,
    isFetching = false,
    clickHandler = () => { },
    appID
}: DataTableProps<TData, TValue>) {

    const [searchParams, setSearchParams] = useSearchParams();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const sort = searchParams.get('sort');
    const [sorting, setSorting] = useState<SortingState>(
        sort ? [{ desc: sort.startsWith('-'), id: sort.replace('-', '') }] : [],
    );
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const pagination = {
        pageIndex: Number(searchParams.get('page')) || 0,
        pageSize: Number(searchParams.get('pageSize')) || 10,
    };
    const openCreatePopup = () => {
        setPopupOpen(true);
    }

    const closePopup = (refreshParent: boolean) => {
        setPopupOpen(false);
        if (refreshParent) {
            const pageSize =  Number(searchParams.get('pageSize')) || 10
            setSearchParams(searchParams => {
                searchParams.set('page', '0');
                searchParams.set('pageSize', pageSize.toString());
                return searchParams;
            });
        }
    };

    useEffect(() => {
        if (sorting.length === 0) return;
        setSearchParams(searchParams => {
            searchParams.set('sort', (sorting[0].desc ? '-' : '') + sorting[0].id);
            return searchParams;
        });
    }, [sorting, setSearchParams]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            pagination,
        },
        pageCount: Math.ceil(totalEntries / pagination.pageSize),
        onPaginationChange: updater => {
            setRowSelection({});
            if (typeof updater !== 'function') return;
            const { pageIndex, pageSize } = updater(pagination);

            setSearchParams(searchParams => {
                searchParams.set('page', pageIndex.toString());
                searchParams.set('pageSize', pageSize.toString());
                return searchParams;
            });
        },
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        manualPagination: true,
    });

    return (
        <div className="space-y-4">
            <div className="mt-2 flex items-center">
                <div className="flex flex-1 items-center gap-4">
                    <SearchInput placeholder="Filter data..." className="w-72" debounce />
                </div>
                <div className="flex gap-4">
                    {table.getIsSomePageRowsSelected() ||
                        table.getIsAllPageRowsSelected() ? (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-2 hover:bg-destructive/5"
                                >
                                    <Trash2Icon className="h-4 w-4" />
                                    <span>Delete</span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete
                                        your data and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="sm:space-x-4">
                                    <Button
                                        variant="destructive"
                                        isLoading={bulkDeleteIsLoading}
                                        onClick={() => {
                                            bulkDeleteHandler(
                                                Object.keys(rowSelection).map(
                                                    index => data[Number(index)].modelID,
                                                ),
                                            );
                                            setRowSelection({});
                                            if (table.getIsAllPageRowsSelected())
                                                table.setPageIndex(pagination.pageIndex - 1);
                                        }}
                                    >
                                        Yes, delete data
                                    </Button>
                                    <AlertDialogCancel disabled={bulkDeleteIsLoading}>
                                        Cancel
                                    </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    ) : null}
                     <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto hidden h-8 lg:flex"
                            onClick={openCreatePopup}
                        >
                            <PlusSquare className="mr-2 h-4 w-4" />
                            Create Content Type
                        </Button>
                    <CreateContentTypePopup onClose={closePopup} title="Create Content Type" isOpen={isPopupOpen} appID={appID}>
                       <p></p>
                    </CreateContentTypePopup>

                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className={isFetching ? 'opacity-60' : 'cursor-pointer'}
                                    onClick={() => clickHandler(row.original.modelID)}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}