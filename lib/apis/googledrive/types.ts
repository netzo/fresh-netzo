export interface File {
  kind: string;
  driveId: string;
  fileExtension: string;
  copyRequiresWriterPermission: boolean;
  md5Checksum: string;
  contentHints: {
    indexableText: string;
    thumbnail: {
      image: string;
      mimeType: string;
    };
  };
  writersCanShare: boolean;
  viewedByMe: boolean;
  mimeType: string;
  exportLinks: {
    [key: string]: string;
  };
  parents: string[];
  thumbnailLink: string;
  iconLink: string;
  shared: boolean;
  lastModifyingUser: {};
  owners: {}[];
  headRevisionId: string;
  sharingUser: {};
  webViewLink: string;
  webContentLink: string;
  size: string;
  viewersCanCopyContent: boolean;
  permissions: {}[];
  hasThumbnail: boolean;
  spaces: string[];
  folderColorRgb: string;
  id: string;
  name: string;
  description: string;
  starred: boolean;
  trashed: boolean;
  explicitlyTrashed: boolean;
  createdTime: string;
  modifiedTime: string;
  modifiedByMeTime: string;
  viewedByMeTime: string;
  sharedWithMeTime: string;
  quotaBytesUsed: string;
  version: string;
  originalFilename: string;
  ownedByMe: boolean;
  fullFileExtension: string;
  properties: {
    [key: string]: any;
  };
  appProperties: {
    [key: string]: any;
  };
  isAppAuthorized: boolean;
  teamDriveId: string;
  capabilities: {
    canChangeViewersCanCopyContent: boolean;
    canMoveChildrenOutOfDrive: boolean;
    canReadDrive: boolean;
    canEdit: boolean;
    canCopy: boolean;
    canComment: boolean;
    canAddChildren: boolean;
    canDelete: boolean;
    canDownload: boolean;
    canListChildren: boolean;
    canRemoveChildren: boolean;
    canRename: boolean;
    canTrash: boolean;
    canReadRevisions: boolean;
    canReadTeamDrive: boolean;
    canMoveTeamDriveItem: boolean;
    canChangeCopyRequiresWriterPermission: boolean;
    canMoveItemIntoTeamDrive: boolean;
    canUntrash: boolean;
    canModifyContent: boolean;
    canMoveItemWithinTeamDrive: boolean;
    canMoveItemOutOfTeamDrive: boolean;
    canDeleteChildren: boolean;
    canMoveChildrenOutOfTeamDrive: boolean;
    canMoveChildrenWithinTeamDrive: boolean;
    canTrashChildren: boolean;
    canMoveItemOutOfDrive: boolean;
    canAddMyDriveParent: boolean;
    canRemoveMyDriveParent: boolean;
    canMoveItemWithinDrive: boolean;
    canShare: boolean;
    canMoveChildrenWithinDrive: boolean;
    canModifyContentRestriction: boolean;
    canAddFolderFromAnotherDrive: boolean;
    canChangeSecurityUpdateEnabled: boolean;
    canAcceptOwnership: boolean;
    canReadLabels: boolean;
    canModifyLabels: boolean;
    canModifyEditorContentRestriction: boolean;
    canModifyOwnerContentRestriction: boolean;
    canRemoveContentRestriction: boolean;
  };
  hasAugmentedPermissions: boolean;
  trashingUser: {};
  thumbnailVersion: string;
  trashedTime: string;
  modifiedByMe: boolean;
  permissionIds: string[];
  imageMediaMetadata: {
    flashUsed: boolean;
    meteringMode: string;
    sensor: string;
    exposureMode: string;
    colorSpace: string;
    whiteBalance: string;
    width: number;
    height: number;
    location: {
      latitude: number;
      longitude: number;
      altitude: number;
    };
    rotation: number;
    time: string;
    cameraMake: string;
    cameraModel: string;
    exposureTime: number;
    aperture: number;
    focalLength: number;
    isoSpeed: number;
    exposureBias: number;
    maxApertureValue: number;
    subjectDistance: number;
    lens: string;
  };
  videoMediaMetadata: {
    width: number;
    height: number;
    durationMillis: string;
  };
  shortcutDetails: {
    targetId: string;
    targetMimeType: string;
    targetResourceKey: string;
  };
  contentRestrictions: {}[];
  resourceKey: string;
  linkShareMetadata: {
    securityUpdateEligible: boolean;
    securityUpdateEnabled: boolean;
  };
  labelInfo: {
    labels: {}[];
    sha1Checksum: string;
    sha256Checksum: string;
  };
}

export interface Files {
  nextPageToken: string;
  kind: string;
  incompleteSearch: boolean;
  files: File[];
}

export interface QueryFiles {
  corpora?: string;
  driveId?: string;
  includeItemsFromAllDrives?: boolean;
  orderBy?:
    | "createdTime"
    | "folder"
    | "modifiedByMeTime"
    | "modifiedTime"
    | "name"
    | "name_natural"
    | "quotaBytesUsed"
    | "recency"
    | "sharedWithMeTime"
    | "starred"
    | "viewedByMeTime";
  pageSize?: number;
  pageToken?: string;
  q?: string;
  spaces?: string;
  supportsAllDrives?: boolean;
  includePermissionsForView?: "published";
  includeLabels?: string;
}

export interface QueryFile {
  acknowledgeAbuse?: boolean;
  supportsAllDrives?: boolean;
  includePermissionsForView?: "published";
  includeLabels?: string;
}

export type QueryCopyFile = Partial<File>;
