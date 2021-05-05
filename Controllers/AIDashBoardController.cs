using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Dapper;
using System.Data.SQLite;
using AIWeb.Models;
using System.Configuration;
namespace AIWeb.Controllers
{
    public class AIDashBoardController : Controller
    {                
        private static string dbPath = ConfigurationManager.AppSettings["DB"].ToString();
        private static string cnStr = "data source=" + dbPath;
        public ActionResult Index()
        {
            return View("training");
        }
        public ActionResult dashboard() {
            return View();
        }
        public ActionResult training() {
            return View();
        }
        public ActionResult testing() {
            return View();
        }

        // 訓練用
        public string createTrainingData(string userName, string taskName, string batchSize, string trainingPath, string algorithm, string deeps) {
            try
            {
                using (var cn = new SQLiteConnection(cnStr))
                {
                    string strSql = "INSERT INTO TRAINING (TrainNO, UserName, TaskName, BatchSize, DEEPS, ALGORITHMNO, PATH, STATUS, CREATETIME) VALUES (@TrainNO, @UserName, @TaskName, @BatchSize, @DEEPS, @ALGORITHMNO, @PATH, @STATUS, @CREATETIME)";
                    TRAINING traininData = new TRAINING() {
                        TrainNO = Guid.NewGuid().ToString(),
                        UserName = userName,
                        TaskName = taskName,
                        BatchSize = batchSize,
                        DEEPS = deeps,
                        ALGORITHMNO = algorithm,
                        PATH = trainingPath,
                        STATUS = "CREATE",
                        CREATETIME = DateTime.Now.ToString(),
                    };
                    cn.Execute(strSql, traininData);
                };
                return "true";//ajax 可回傳 json or 字串
            }
            catch (Exception ex) {
                return ex.ToString();
            }                        
        }
        public string deleteTrainingData(string TrainNO) {
            try
            {
                using (var cn = new SQLiteConnection(cnStr))
                {
                    string strSql = "DELETE FROM TRAINING WHERE TrainNO=@TrainNO";
                    cn.Execute(strSql, new { TrainNO = TrainNO });
                    return "true";
                }
            }
            catch (Exception ex) {
                return ex.ToString();
            }            
        }
        //取得TrainingData
        public ActionResult getTrainingData() {
            List<TRAINING> data;
            string strSql = "select * from TRAINING order by CREATETIME desc";
            using (var cn = new SQLiteConnection(cnStr)) {
                data = cn.Query<TRAINING>(strSql).ToList();            
            }            
            var result = Json(new { data = data }, JsonRequestBehavior.AllowGet);
            return result;
        }


        //測試頁面
        public ActionResult getTrainingModel()
        {
            List<TRAINING> data;
            string strSql = "select * from TRAINING WHERE status='DONE' order by CREATETIME desc";
            using (var cn = new SQLiteConnection(cnStr))
            {
                data = cn.Query<TRAINING>(strSql).ToList();
            }
            var result = Json(new { data = data }, JsonRequestBehavior.AllowGet);
            return result;
        }
        public string createTestData(string userName, string taskName, string path, string trainNO) {
            using (var cn = new SQLiteConnection(cnStr))
            {
                string strSql = "INSERT INTO TESTING (TestNO, UserName, TaskName, TrainNO, PATH,  STATUS, CREATETIME) VALUES (@TestNO, @UserName, @TaskName, @TrainNO, @PATH, @STATUS, @CREATETIME)";
                TESTING data = new TESTING() {
                    TestNO = Guid.NewGuid().ToString(),
                    UserName = userName,
                    TaskName = taskName,
                    TrainNO = trainNO,
                    PATH = path,
                    STATUS = "CREATE",
                    CREATETIME = DateTime.Now.ToString()
                };
                cn.Execute(strSql, data);
            };
            return "true";//ajax 可回傳 json or 字串
        }
        public ActionResult getTestingData()
        {
            List<TESTING> data;
            string strSql = "select * from TESTING";
            using (var cn = new SQLiteConnection(cnStr))
            {
                data = cn.Query<TESTING>(strSql).ToList();
            }
            var result = Json(new { data = data }, JsonRequestBehavior.AllowGet);
            return result;
        }

        public string deleteTestingData(string TestNO)
        {
            try
            {
                using (var cn = new SQLiteConnection(cnStr))
                {
                    string strSql = "DELETE FROM TESTING WHERE TestNO=@TestNO";
                    cn.Execute(strSql, new { TestNO = TestNO });
                    return "true";
                }
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        /*測試用的*/
        public ActionResult sampleDashboard() {
            return View();
        }
        public JsonResult getDataforTable() {
            List<Employee> employeeList;
            string strSql = "select * from EMPLOYEE";
            using (SQLiteConnection cn = new SQLiteConnection(cnStr)) {
                employeeList = cn.Query<Employee>(strSql).ToList();
            }
            string result = JsonConvert.SerializeObject(employeeList);            
            return Json(result);
        }
        public ActionResult getList() {
            List<Employee> employeeList;
            string strSql = "select * from EMPLOYEE";
            using (SQLiteConnection cn = new SQLiteConnection(cnStr))
            {
                employeeList = cn.Query<Employee>(strSql).ToList();
            }
            var result = Json(new { data = employeeList }, JsonRequestBehavior.AllowGet);
            return result;
        }
    }
}