using ETCORE_WEBAPPLIACATION.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Data
{
    public class UserRespository
    {
        private readonly string _connectionString;
        public UserRespository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        public async Task<List<ProductsViewModel>> GetAllProduct()
        {
            //DataTable product_table = new DataTable();
            var response = new List<ProductsViewModel>();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetAllProduct", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@top", System.Data.SqlDbType.Int).Value = 10;
                    // create data adapter
                    //SqlDataAdapter da = new SqlDataAdapter(cmd);
                    //da.Fill(product_table);
                    await conn.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response.Add(
                                new ProductsViewModel
                                {
                                    ProId = (int)reader["ProId"],
                                    ProName = reader["ProName"].ToString(),
                                    //ProCategory = reader["ProCategory"].ToString(),
                                    Unit = reader["Unit"].ToString(),
                                    StockQuatity = (int)reader["StockQuatity"],
                                    Photos = GetPhotoProduct((int)reader["ProId"])
                                }
                                );
                        }
                    }
                }
            }
            return response;
        }
        public List<Photo> GetPhotoProduct(int productId)
        {
            //DataTable product_table = new DataTable();
            var response = new List<Photo>();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetAllPhotoOfProduct", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@productId", System.Data.SqlDbType.Int).Value = productId;
                    //cmd.Parameters.AddWithValue("productId", productId);
                    // create data adapter
                    //SqlDataAdapter da = new SqlDataAdapter(cmd);
                    //da.Fill(product_table);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            response.Add(
                                new Photo
                                {
                                    Id = (int)reader["Id"],
                                    Featured = reader["Featured"].ToString(),
                                    Name = reader["Name"].ToString(),
                                    ProductId = (int)reader["ProductId"],
                                    Status = reader["Status"].ToString()
                                }
                                ); ;
                        }
                    }
                }
            }
            return response;
        }
    }
}
