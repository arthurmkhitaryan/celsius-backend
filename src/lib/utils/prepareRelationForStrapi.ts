export interface RelationAction {
  connect?: number | number[];
  disconnect?: number | number[];
}

export interface RelationData {
  [key: string]: RelationAction;
}

export interface PreparedRelation {
  disconnect: { id: number }[];
  connect: { id: number; position?: { end: boolean } }[];
}

export interface PreparedData {
  [key: string]: any;
}

export const prepareRelationForStrapi = (data: RelationData): PreparedData => {
  const preparedData: PreparedData = {};

  Object.keys(data).forEach((key) => {
    const { connect, disconnect } = data[key];
    preparedData[key] = {
      disconnect: Array.isArray(disconnect)
        ? disconnect.map((id: number) => ({ id }))
        : disconnect
          ? [{ id: disconnect }]
          : [],
      connect: Array.isArray(connect)
        ? connect.map((id: number) => ({ id, position: { end: true } }))
        : connect
          ? [{ id: connect, position: { end: true } }]
          : [],
    };
  });

  return preparedData;
};
