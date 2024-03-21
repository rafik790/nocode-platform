import { useEffect, useState } from 'react';
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { PlusSquare} from 'lucide-react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/Table';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../ui/Button';
import AddEditFieldPopup from './AddEditFieldPopup';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isFetching?: boolean;
    clickHandler?: (id: string) => void;
    appID: string;
    model: any
}

export function DataTable<TData extends { fieldID: string }, TValue>({
    columns,
    data,
    isFetching = false,
    clickHandler = () => { },
    appID,
    model
}: DataTableProps<TData, TValue>) {

    const [searchParams, setSearchParams] = useSearchParams();
    const [isPopupOpen, setPopupOpen] = useState(false);

    const sort = searchParams.get('sort');
    const [sorting, setSorting] = useState<SortingState>(
        sort ? [{ desc: sort.startsWith('-'), id: sort.replace('-', '') }] : [],
    );

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [isEntityFieldAdded, setEntityFieldAdded] = useState(false);

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
            const pageSize = Number(searchParams.get('pageSize')) || 10
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
        state: {
            columnVisibility,
            rowSelection,
        },
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection
    });

    return (
        <div className="space-y-4">
            <div className="mt-2 flex items-center">
                <div className="flex flex-1 items-center gap-4">
                    Conent Model: {model.modelName}
                </div>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto hidden h-8 lg:flex"
                        onClick={openCreatePopup}
                    >
                        <PlusSquare className="mr-2 h-4 w-4" />
                        Add Field
                    </Button>
                    <AddEditFieldPopup onClose={closePopup} title="Add Field" isOpen={isPopupOpen} appID={appID} modelID={model._id} entityFieldAdded={model.isEntityFieldAdded}>
                        <p></p>
                    </AddEditFieldPopup>
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
                                    onClick={() => clickHandler(row.original.fieldID)}
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
        </div>
    );
}
