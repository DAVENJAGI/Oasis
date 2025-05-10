#!/usr/bin/python3
"""
This file contains the Report module
"""
from api.v1.views import report_views
from flask import jsonify, abort, request, make_response
from models import storage
from models.report import Report
from models.favorite_listing import favoriteListing
from models.listing import Listing
from flasgger.utils import swag_from
from werkzeug.security import generate_password_hash


@report_views.route('/reports', methods=['GET'], strict_slashes=False)
@swag_from('documentation/report/get.yml', methods=['GET'])
def get_all_reports():
    """ get reports by id"""
    all_list = [obj.to_dict() for obj in storage.all(Report).values()]
    return jsonify(all_list)


@report_views.route('/reports/<string:report_id>', methods=['GET'],
                 strict_slashes=False)
@swag_from('documentation/report/get_id.yml', methods=['GET'])
def get_report(report_id):
    """ get report by id"""
    report = storage.get(Report, report_id)
    if report is None:
        message = f"report with id {report_id} not found"
        return make_response(jsonify({"Message": message}), 404)
    return jsonify(report.to_dict())


@report_views.route('/reports/<string:report_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/report/delete.yml', methods=['DELETE'])
def del_report(report_id):
    """ delete report by id"""
    report = storage.get(Report, report_id)
    if report is None:
        return make_response(jsonify({"error": "Report not found."}), 404)
    report.delete()
    storage.save()
    return jsonify({})


@report_views.route('/reports/<string:report_id>', methods=['PUT'],
                 strict_slashes=False)
@swag_from('documentation/report/put.yml', methods=['PUT'])
def post_report(report_id):
    """  """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    obj = storage.get(Report, report_id)
    if obj is None:
        return make_response(jsonify({"error": "Report not found"}), 404)
    for key, value in request.get_json().items():
        if key not in ['id', 'created_at', 'updated']:
            setattr(obj, key, value)
    storage.save()
    return jsonify(obj.to_dict())
