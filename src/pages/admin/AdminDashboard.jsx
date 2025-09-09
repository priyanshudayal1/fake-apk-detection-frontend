import React, { useEffect, useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";

const AdminDashboard = () => {
  const {
    reports,
    stats,
    pagination,
    loading,
    error,
    selectedReport,
    fetchReports,
    fetchSingleReport,
    deleteReport,
    clearError,
    clearSelectedReport,
    formatTimestamp,
    getRiskLevelColor,
    getReportTypeBadge,
  } = useAdminStore();

  const [showModal, setShowModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);

  useEffect(() => {
    const loadReports = async () => {
      try {
        await fetchReports();
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };

    loadReports();
  }, [fetchReports]);

  const handlePageChange = (newPage) => {
    fetchReports(newPage, pagination.per_page);
  };

  const handleViewReport = async (reportId) => {
    try {
      await fetchSingleReport(reportId);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to fetch report details:", error);
    }
  };

  const handleDeleteReport = async (reportId) => {
    try {
      await deleteReport(reportId);
      setReportToDelete(null);
    } catch (error) {
      console.error("Failed to delete report:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    clearSelectedReport();
  };

  if (loading && reports.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Monitor and manage abuse reports</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
                <button
                  onClick={clearError}
                  className="mt-1 text-sm text-red-600 underline hover:text-red-500"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Reports</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">
              Single Reports
            </h3>
            <p className="text-2xl font-bold text-blue-600">{stats.single}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Batch Reports</h3>
            <p className="text-2xl font-bold text-purple-600">{stats.batch}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">High Risk</h3>
            <p className="text-2xl font-bold text-red-600">{stats.high_risk}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Medium Risk</h3>
            <p className="text-2xl font-bold text-orange-600">
              {stats.medium_risk}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Low Risk</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.low_risk}
            </p>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Recent Reports
            </h2>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No reports found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                No abuse reports have been submitted yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      APK File
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reporter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr
                      key={report.file_metadata?.filename || Math.random()}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.report_metadata?.report_id || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getReportTypeBadge(
                            report.report_type
                          )}`}
                        >
                          {report.report_type || "Unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.apk_analysis?.filename || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskLevelColor(
                            report.apk_analysis?.risk_level
                          )}`}
                        >
                          {report.apk_analysis?.risk_level || "Unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div className="font-medium">
                            {report.report_metadata?.reporter?.name ||
                              "Anonymous"}
                          </div>
                          <div className="text-gray-500">
                            {report.report_metadata?.reporter?.email || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTimestamp(report.report_metadata?.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() =>
                            handleViewReport(report.report_metadata?.report_id)
                          }
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <button
                          onClick={() =>
                            setReportToDelete(report.report_metadata?.report_id)
                          }
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing page {pagination.page} of {pagination.pages} (
                {pagination.total} total reports)
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1 || loading}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages || loading}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Report Detail Modal */}
      {showModal && selectedReport && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Report Details: {selectedReport.report_metadata?.report_id}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* APK Analysis */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      APK Analysis
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Filename:</span>{" "}
                        {selectedReport.apk_analysis?.filename}
                      </div>
                      <div>
                        <span className="font-medium">Package:</span>{" "}
                        {selectedReport.apk_analysis?.package || "N/A"}
                      </div>
                      <div>
                        <span className="font-medium">SHA256:</span>{" "}
                        <span className="font-mono text-xs">
                          {selectedReport.apk_analysis?.sha256 || "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Prediction:</span>{" "}
                        {selectedReport.apk_analysis?.prediction}
                      </div>
                      <div>
                        <span className="font-medium">Probability:</span>{" "}
                        {(
                          selectedReport.apk_analysis?.probability * 100
                        ).toFixed(2)}
                        %
                      </div>
                      <div>
                        <span className="font-medium">Risk Level:</span>
                        <span
                          className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskLevelColor(
                            selectedReport.apk_analysis?.risk_level
                          )}`}
                        >
                          {selectedReport.apk_analysis?.risk_level}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reporter Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Reporter Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Name:</span>{" "}
                        {selectedReport.report_metadata?.reporter?.name}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>{" "}
                        {selectedReport.report_metadata?.reporter?.email}
                      </div>
                      <div>
                        <span className="font-medium">Timestamp:</span>{" "}
                        {formatTimestamp(
                          selectedReport.report_metadata?.timestamp
                        )}
                      </div>
                      <div>
                        <span className="font-medium">Notes:</span>{" "}
                        {selectedReport.report_metadata?.additional_notes ||
                          "None"}
                      </div>
                    </div>
                  </div>

                  {/* Technical Indicators */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Technical Indicators
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Permissions:</span>{" "}
                        {selectedReport.technical_indicators?.permissions
                          ?.length || 0}
                      </div>
                      <div>
                        <span className="font-medium">Suspicious APIs:</span>{" "}
                        {
                          Object.keys(
                            selectedReport.technical_indicators
                              ?.suspicious_apis || {}
                          ).length
                        }
                      </div>
                      <div>
                        <span className="font-medium">Certificate:</span>{" "}
                        {
                          selectedReport.technical_indicators?.certificate_info
                            ?.status
                        }
                      </div>
                    </div>
                  </div>

                  {/* STIX Template */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      STIX Template
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Type:</span>{" "}
                        {selectedReport.stix_template?.type}
                      </div>
                      <div>
                        <span className="font-medium">Labels:</span>{" "}
                        {selectedReport.stix_template?.labels?.join(", ")}
                      </div>
                      <div>
                        <span className="font-medium">Pattern:</span>{" "}
                        <span className="font-mono text-xs">
                          {selectedReport.stix_template?.pattern}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {reportToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-2">
                Delete Report
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this report? This action
                  cannot be undone.
                </p>
              </div>
              <div className="flex justify-center space-x-3 mt-4">
                <button
                  onClick={() => setReportToDelete(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteReport(reportToDelete)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
