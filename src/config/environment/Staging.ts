/**
 * Created by fajar on 09/18/2018.
 *
 * File environment for staging
 * this file can import by alias 'environment'
 */

import BaseEnvironment from './BaseEnvironment';

export default ((ENV: any) => {

  ENV.LOGGER = false;

  ENV.BASE_URL = 'http://10.14.153.89:8080/';
  ENV.LOGIN_API = ENV.BASE_URL + 'do-login/';
  ENV.LOGOUT_API = ENV.BASE_URL + 'do-logout/';
  ENV.USER_API = ENV.BASE_URL + 'users/';
  ENV.TUJUAN_COSO_API = ENV.BASE_URL + 'tujuan-cosos/';
  ENV.TUTORIALS_API = ENV.BASE_URL + 'tutorials/';
  ENV.TUTORIAL_VIDEO_API = ENV.BASE_URL + 'tutorial-videos/';
  ENV.PROTOTYPE_API = ENV.BASE_URL + 'prototypes/';
  ENV.MENU_API = ENV.BASE_URL + 'menus/';
  ENV.SEGMEN_API = ENV.BASE_URL + 'segmens/';
  ENV.UNIT_API = ENV.BASE_URL + 'units/';
  ENV.RCM_API = ENV.BASE_URL + 'risk-control-matrixs/';
  ENV.RCM_USULAN_API = ENV.BASE_URL + 'risk-control-matrix-usulans/';
  ENV.RCM_TRANSAKSI_API = ENV.BASE_URL + 'risk-control-matrix-transaksies/';
  ENV.ORGANISASI_API = ENV.BASE_URL + 'organisasis/';
  ENV.ROLE_API = ENV.BASE_URL + 'roles/';
  ENV.DAMPAK_API = ENV.BASE_URL + 'dampaks/';
  ENV.LOKASI_API = ENV.BASE_URL + 'lokasis/';
  ENV.JENIS_KONTROL_API = ENV.BASE_URL + 'jenis-kontrols/';
  ENV.FREKUENSI_API = ENV.BASE_URL + 'frekuensis/';
  ENV.JABATAN_API = ENV.BASE_URL + 'jabatans/';
  ENV.BERITA_API = ENV.BASE_URL + 'beritas/';
  ENV.PERIODE_API = ENV.BASE_URL + 'periodes/';
  ENV.KETIDAKEFEKTIFAN_API = ENV.BASE_URL + 'ketidakefektifans/';
  ENV.PRC_API = ENV.BASE_URL + 'pelaksana-risk-controls/';
  ENV.CSA_PREPARERS_API = ENV.BASE_URL + 'csa-preparers/';
  ENV.CSA_SAMPLE_API = ENV.BASE_URL + 'csa-samples/';
  ENV.CSA_CERTIFICATE_API = ENV.BASE_URL + 'csa-sertifikators/';
  ENV.CSA_EVIDENCE_API = ENV.BASE_URL + 'csa-evidences/';
  ENV.CSA_EVIDENCE_PENDING_FILE_API = ENV.CSA_EVIDENCE_API + 'pending-file';
  ENV.CSA_REVIEWERS_API = ENV.BASE_URL + 'csa-reviewers/';
  ENV.PRC_LOG_API = ENV.BASE_URL + 'prc-logs/';
  ENV.PRC_MAPPING_API = ENV.BASE_URL + 'prc-mappings/';
  ENV.BUKTI_PENYELESAIAN_API = ENV.BASE_URL + 'bukti-penyelesaians/';
  ENV.DASHBOARD_ADMIN_API = ENV.BASE_URL + 'dashboard-admin/';
  ENV.DASHBOARD_CHAMPION_API = ENV.BASE_URL + 'dashboard-champion/';
  ENV.REKAPITULASI_API = ENV.BASE_URL + 'rekapitulasis/';
  ENV.FLOWCHART_API = ENV.BASE_URL + 'flowcharts/';
  ENV.NOTIFICATION_API = ENV.BASE_URL + 'notifications/';
  ENV.AUDIT_TRAILS_API = ENV.BASE_URL + 'audit-trails/';
  ENV.ANALISIS_EFEKTIFITAS_API = ENV.BASE_URL + 'analisis-efektifitas-kontrols/';
  ENV.UPLOAD_TEST_API = ENV.BASE_URL + 'tus-files/test/';
  ENV.API_CDN = 'http://10.14.153.89:9999/icofrfile/';

  ENV.QUEUE_NOTIFICATION = ENV.BASE_URL + 'notification/';

  return ENV;
})(BaseEnvironment);
