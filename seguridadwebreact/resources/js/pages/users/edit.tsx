import { Head, Form, Link} from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, User } from '@/types';
import users from '@/routes/users';
import UserController, { edit, destroy } from '@/actions/App/Http/Controllers/UserController';




export default function UserEdit({user}:{user: User}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: users.index().url,
        },
        {
            title: 'Edit',
            href: users.edit(user.id).url,
        }
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit User ${user.id}`} />
                <div className='flex justify-center w-full'>
                <Form
                    method="put"
                    action={UserController.update(user.id).url}
                    resetOnSuccess={['password']}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Full name"
                                        defaultValue={user.name}
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="email@example.com"
                                        defaultValue={user.email}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <InputError message={errors.password} />
                                </div>


                                <Button
                                    type="submit"
                                    className="mt-2 w-full"
                                    tabIndex={4}
                                    data-test="register-user-button"
                                >
                                    {processing && <Spinner />}
                                    Update User
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
                </div>
        </AppLayout>
    );
}
