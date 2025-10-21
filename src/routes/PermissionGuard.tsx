import { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { Routes } from 'src/enums';
import {
	AbilityActions,
	AbilitySubjects,
	useAbility,
	useNotify,
} from 'src/hooks';

export interface PermissionGuardProps {
	action?: AbilityActions;
	subject: AbilitySubjects;
}

export const PermissionGuard: React.FC<
	PropsWithChildren<PermissionGuardProps>
> = ({ action = 'manage', children, subject }) => {
	const { t } = useTranslation();
	const { notify } = useNotify();
	const ability = useAbility();

	const hasPermission = ability.can(action, subject);

	useEffect(() => {
		if (!hasPermission) notify(t('common.no_permission'), { type: 'warning' });
	}, [hasPermission, notify, t]);

	if (!hasPermission)
		return (
			<Navigate
				replace
				to={Routes.Home}
			/>
		);

	return <>{children}</>;
};
