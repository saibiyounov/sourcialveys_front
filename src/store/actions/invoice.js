import * as actionTypes from "./actionTypes";
import Axios from "../../axios-proas";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useTranslation } from "react-i18next";
import { getNotyfObject } from "../../shared/utility";
const notyf = getNotyfObject();

export const invoiceStart = () => {
  return {
    type: actionTypes.INVOICE_START,
  };
};

export const invoiceSetPage = (page) => ({
  type: actionTypes.INVOICE_SET_PAGE,
  currentPage: page,
});

export const invoiceSetPageSize = (pageSize) => ({
  type: actionTypes.INVOICE_SET_PAGESIZE,
  pageSize: pageSize,
});

export const invoiceSuccess = (
  data,
  count,
  amountBTTotal,
  amountATTotal,
  amountBTValues,
  amountATValues
) => {
  return {
    type: actionTypes.INVOICE_SUCCESS,
    data: data,
    amountBTTotal: amountBTTotal,
    amountATTotal: amountATTotal,
    amountBTValues: amountBTValues,
    amountATValues: amountATValues,
    count: count,
  };
};

export const invoiceFail = (error) => {
  return {
    type: actionTypes.INVOICE_FAIL,
    error: error,
  };
};

export const invoiceGetAll = () => {
  return (dispatch) => {
    dispatch(invoiceStart());
    Axios.get("/invoice/")
      .then((response) => {
        dispatch(invoiceSuccess(response.data[0], response.data[1]));
      })
      .catch((err) => {
        dispatch(invoiceFail(err.response.data.message));
      });
  };
};

export const invoiceGetPage = (
  page,
  filters,
  sort,
  reverse,
  pageSize = 100
) => {
  let newFilters = {
    pageSize: pageSize,
  };
  if (filters) {
    for (const key in filters) {
      if (filters[key])
        newFilters = {
          ...newFilters,
          [key]: filters[key],
        };
    }
  }
  if (sort) {
    newFilters = {
      ...newFilters,
      orderBy: sort,
    };
  }
  if (reverse) {
    newFilters = {
      ...newFilters,
      reverse: reverse[sort],
    };
  }
  return (dispatch) => {
    dispatch(invoiceStart());
    //Axios.get('/invoice/'+id_user+'/search?page='+page +'&role='+role, {
    Axios.get("/invoice?page=" + page, {
      params: { ...newFilters },
    })
      .then((response) => {
        dispatch(
          invoiceSuccess(
            response?.data?.result,
            response.status === 204 ? 0 : response?.data?.count,
            response?.data?.amountBTTotal,
            response?.data?.amountATTotal,
            response?.data?.amountBTValues,
            response?.data?.amountATValues
          )
        );
      })
      .catch((err) => {
        dispatch(invoiceFail(err?.response?.data?.message));
      });
  };
};

export const reportingInvoiceGetPage = (
  page,
  filters,
  sort,
  reverse,
  pageSize = 100
) => {
  let newFilters = {
    pageSize: pageSize,
  };
  if (filters) {
    for (const key in filters) {
      if (filters[key])
        newFilters = {
          ...newFilters,
          [key]: filters[key],
        };
    }
  }
  if (sort) {
    newFilters = {
      ...newFilters,
      orderBy: sort,
    };
  }
  if (reverse) {
    newFilters = {
      ...newFilters,
      reverse: reverse[sort],
    };
  }
  return (dispatch) => {
    dispatch(invoiceStart());
    //Axios.get('/invoice/'+id_user+'/search?page='+page +'&role='+role, {
    Axios.get("/invoice//ereportingInvoices?page=" + page, {
      params: { ...newFilters },
    })
      .then((response) => {
        dispatch(
          invoiceSuccess(
            response?.data?.result,
            response.status === 204 ? 0 : response?.data?.count,
            response?.data?.amountBTTotal,
            response?.data?.amountATTotal,
            response?.data?.amountBTValues,
            response?.data?.amountATValues
          )
        );
      })
      .catch((err) => {
        dispatch(invoiceFail(err.response.data.message));
      });
  };
};

export const invoiceSetFiltersQuery = (filtersQuery) => {
  return {
    type: actionTypes.INVOICE_SET_FILTERSQUERY,
    filters: filtersQuery,
    filtering: invoiceUpdateFiltering(filtersQuery),
  };
};

export const invoiceUpdateFiltering = (filtersQuery) => {
  let filter = false;
  if (filtersQuery) {
    for (const key in filtersQuery) {
      if (filtersQuery[key]) {
        filter = true;
      }
    }
  }
  return filter;
};

export const invoiceSetQuickFilter = (quickFilterField) => {
  return {
    type: actionTypes.INVOICE_SET_QUICKFILTER,
    quickFilter: quickFilterField,
  };
};

export const invoiceUpdateShowFilters = (show) => {
  return {
    type: actionTypes.INVOICE_UPDATE_SHOWFILTERS,
    showFilters: show,
  };
};

export const invoiceSetSortQuery = (sortQuery) => {
  return {
    type: actionTypes.INVOICE_SET_SORTQUERY,
    sortQuery: sortQuery,
  };
};

export const invoiceSetReverseSort = (reverse) => {
  return {
    type: actionTypes.INVOICE_SET_REVERSESORT,
    reverse: reverse,
  };
};

export const invoiceGetDocSuccess = (fileB64) => {
  return {
    type: actionTypes.INVOICE_GET_DOCUMENT_FILE,
    file: fileB64,
  };
};

export const invoiceGetDocumentFile = (uid) => {
  return (dispatch) => {
    Axios.get("/invoice/" + uid + "/documentFile", {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          let blob = new Blob([response.data], {
            type: response.request.getResponseHeader("Content-Type"),
          });
          let filename = "";
          const disposition = response.request.getResponseHeader(
            "Content-Disposition"
          );
          if (disposition && disposition.indexOf("attachment") !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches !== null && matches[1]) {
              filename = matches[1].replace(/['"]/g, "");
            }
          }
          const downloadUrl = URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = downloadUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
        } else {
          notyf.error("document non trouvé");
        }
      })
      .catch((err) => {
        notyf.error("Une erreur s'est produite !");
      });
  };
};
// var blob = new Blob([xmlFile], { type: 'text/plain' })

// //const downloadUrl = URL.createObjectURL(blob)
// let a = document.createElement("a");
// //a.setAttribute('href', window.URL.createObjectURL(blob));
// a.href = window.URL.createObjectURL(blob) ;
// a.download = tab=="xml"?xmlFileName:ediFileName || "facture.xml";
// a.dataset.downloadurl = ['', a.download, a.href].join(':');
// document.body.appendChild(a);
// a.click();

export const invoiceGetDocumentChorus = (uid) => {
  return (dispatch) => {
    Axios.get("/invoice/" + uid + "/documentFileChorus", {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          let blob = new Blob([response.data], {
            type: response.request.getResponseHeader("Content-Type"),
          });
          let filename = "";
          const disposition = response.request.getResponseHeader(
            "Content-Disposition"
          );
          if (disposition && disposition.indexOf("attachment") !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches !== null && matches[1]) {
              filename = matches[1].replace(/['"]/g, "");
            }
          }
          const downloadUrl = URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = downloadUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
        } else {
          notyf.error("document non trouvé");
        }
      })
      .catch((err) => {
        notyf.error("Une erreur s'est produite !");
      });
  };
};

export const invoiceGetDocumentEdi = (uid) => {
  return (dispatch) => {
    Axios.get("/invoice/" + uid + "/documentFileEdi", {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          let blob = new Blob([response.data], {
            type: response.request.getResponseHeader("Content-Type"),
          });
          let filename = "";
          const disposition = response.request.getResponseHeader(
            "Content-Disposition"
          );
          if (disposition && disposition.indexOf("attachment") !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches !== null && matches[1]) {
              filename = matches[1].replace(/['"]/g, "");
            }
          }
          const downloadUrl = URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = downloadUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
        } else {
          notyf.error("document non trouvé");
        }
      })
      .catch((err) => {
        notyf.error("Une erreur s'est produite !");
      });
  };
};
export const invoiceGetDocumentXml = (uid) => {
  return (dispatch) => {
    Axios.get("/invoice/" + uid + "/documentFileXml", {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          let blob = new Blob([response.data], {
            type: response.request.getResponseHeader("Content-Type"),
          });
          let filename = "";
          const disposition = response.request.getResponseHeader(
            "Content-Disposition"
          );
          if (disposition && disposition.indexOf("attachment") !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches !== null && matches[1]) {
              filename = matches[1].replace(/['"]/g, "");
            }
          }
          const downloadUrl = URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = downloadUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
        } else {
          notyf.error("document non trouvé");
        }
      })
      .catch((err) => {
        notyf.error("Une erreur s'est produite !");
      });
  };
};

export const invoiceSelectRow = (rowId, selected) => {
  return {
    type: actionTypes.INVOICE_SELECT_ROW,
    rowId: rowId,
    selected: selected,
  };
};

export const invoiceSelectAllRows = (selectedAll) => {
  return {
    type: actionTypes.INVOICE_SELECT_ALL_ROWS,
    selectedAll: selectedAll,
  };
};

export const invoiceGetCompressedDocument = (selectedIds) => {
  return (dispatch) => {
    Axios.get("/invoice//compressedDocument?selection=" + selectedIds, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          let blob = new Blob([response.data], { type: "application/zip" });
          const downloadUrl = URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = downloadUrl;
          a.download = "compressed.zip";
          document.body.appendChild(a);
          a.click();
        } else {
          notyf.error("Archive vide ou non valide");
        }
      })
      .catch((err) => {
        notyf.error("Une erreur s'est produite !");
      });
  };
};

export const invoiceSetImportErrorsCount = (count) => {
  return {
    type: actionTypes.INVOICE_SET_IMPORT_ERRORS_COUNT,
    importErrorsCount: count,
  };
};

export const invoiceGetImportErrorsCount = () => {
  return (dispatch) => {
    Axios.get("/importErrorField//count")
      .then((response) => {
        dispatch(invoiceSetImportErrorsCount(Number(response.data.count)));
      })
      .catch((err) => {
        dispatch(invoiceSetImportErrorsCount(null));
      });
  };
};
